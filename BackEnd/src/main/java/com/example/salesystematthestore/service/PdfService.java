package com.example.salesystematthestore.service;

import com.example.salesystematthestore.config.pdf.model.*;
import com.example.salesystematthestore.entity.Order;
import com.example.salesystematthestore.entity.OrderItem;
import com.example.salesystematthestore.service.imp.PdfServiceImp;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import com.itextpdf.kernel.color.Color;
import com.itextpdf.kernel.events.PdfDocumentEvent;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.border.Border;
import com.itextpdf.layout.border.DashedBorder;
import com.itextpdf.layout.border.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Data
public class PdfService implements PdfServiceImp {

    Document document;
    PdfDocument pdfDocument;
    String pdfName;
    float threecol = 190f;
    float twocol = 285f;
    float twocol150 = twocol + 150f;
    float twocolumnWidth[] = {twocol150, twocol};
    float threeColumnWidth[] = {threecol, threecol, threecol};
    float fullwidth[] = {threecol * 3};


    public void createDocument(String pdfName) throws FileNotFoundException {
        if (pdfName == null || pdfName.isEmpty()) {
            throw new IllegalArgumentException("pdfName cannot be null or empty");
        }
        this.pdfName = pdfName; // Set the pdfName here

        PdfWriter pdfWriter = new PdfWriter(pdfName);
        pdfDocument = new PdfDocument(pdfWriter);
        pdfDocument.setDefaultPageSize(PageSize.A4);
        this.document = new Document(pdfDocument);
    }

    public String createTnc(String fileName, List<String> TncList, Boolean lastPage, String imagePath) throws IOException {
        if (lastPage) {
            float threecol = 190f;
            float fullwidth[] = {threecol * 3};
            Table tb = new Table(fullwidth);
            tb.addCell(new Cell().add("TERMS AND CONDITIONS\n").setBold().setBorder(Border.NO_BORDER));
            for (String tnc : TncList) {

                tb.addCell(new Cell().add(tnc).setBorder(Border.NO_BORDER));
            }

            document.add(tb);
        } else {
            pdfDocument.addEventHandler(PdfDocumentEvent.END_PAGE, new MyFooter(document, TncList, imagePath));
        }

        document.close();

        FileInputStream serviceAccount = new FileInputStream("./tttttt.json");

        Storage storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build()
                .getService();

        Bucket bucket = storage.get("four-gems.appspot.com");

        String path = fileName;
        Path localFilePath = Paths.get(path);
        String fileNameFinal = localFilePath.getFileName().toString();

        BlobInfo blobInfo = BlobInfo.newBuilder(bucket.getName(), fileNameFinal)
                .setContentType("application/pdf")
                .build();

        Blob blob = storage.create(blobInfo, Files.readAllBytes(localFilePath));
        blob.createAcl(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER));


        String fileUrl = "https://firebasestorage.googleapis.com/v0/b/four-gems.appspot.com/o/" + fileNameFinal + "?alt=media";

        Files.delete(localFilePath);
        return fileUrl;
    }

    public String createPdfAndUpload(Order order) throws IOException {
        LocalDate ld = LocalDate.now();
        String pdfName = order.getId() + ".pdf";
        PdfService cepdf = new PdfService();

        cepdf.createDocument(pdfName);
        cepdf.setPdfName(pdfName);
        //Create Header start
        HeaderDetails header = new HeaderDetails();
        header.setInvoiceNo("FOURGEM" + order.getId()).setInvoiceDate(LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))).build();
        cepdf.createHeader(header);
        //Header End

        //Create Address start
        AddressDetails addressDetails = new AddressDetails();

        addressDetails
                .setBillingCompany("FOUR GEM")
                .setBillingName(order.getCustomer().getName())
                .setBillingAddress(order.getCustomer().getAddress())
                .setBillingEmail(order.getCustomer().getEmail())
                .setShippingName(order.getCustomer().getName())
                .setShippingAddress(order.getCustomer().getAddress()+"\n")
                .build();

        cepdf.createAddress(addressDetails);
        //Address end

        //Product Start
        ProductTableHeader productTableHeader = new ProductTableHeader();
        cepdf.createTableHeader(productTableHeader);
        List<OrderItem> productList = order.getOrderItemList();
        productList = cepdf.modifyProductList(productList);
        cepdf.createProduct(order);
        //Product End

        //Term and Condition Start
        List<String> TncList = new ArrayList<>();
        TncList.add("1. The warranty does not cover damages caused by improper use or accidents.");
        TncList.add("2. We are committed to protecting customer personal information and will not share it with third parties.");
        TncList.add("3. Clean jewelry with a soft cloth and avoid using harsh cleaning agents.");
        String imagePath = "src/main/resources/ce_logo_circle_transparent.png";
        String url = cepdf.createTnc(pdfName,TncList, false, imagePath);
        System.out.println(url);
        return url;
    }


    public void createProduct(Order order) {
        List<OrderItem> productList = order.getOrderItemList();
        float threecol = 190f;
        float fullwidth[] = {threecol * 3};
        Table threeColTable2 = new Table(threeColumnWidth);
        float totalSum = getTotalSum(productList);
        for (OrderItem product : productList) {
            float total =  (float)(product.getQuantity() * product.getPrice());
            threeColTable2.addCell(new Cell().add(product.getProduct().getProductName()).setBorder(Border.NO_BORDER)).setMarginLeft(10f);
            threeColTable2.addCell(new Cell().add(String.valueOf(product.getQuantity())).setTextAlignment(TextAlignment.CENTER).setBorder(Border.NO_BORDER));
            threeColTable2.addCell(new Cell().add("$"+(total)).setTextAlignment(TextAlignment.RIGHT).setBorder(Border.NO_BORDER)).setMarginRight(15f);
        }

        document.add(threeColTable2.setMarginBottom(20f));
        float onetwo[] = {threecol + 125f, threecol * 2};
        Table threeColTable4 = new Table(onetwo);
        threeColTable4.addCell(new Cell().add("").setBorder(Border.NO_BORDER));
        threeColTable4.addCell(new Cell().add(fullwidthDashedBorder(fullwidth)).setBorder(Border.NO_BORDER));
        document.add(threeColTable4);

        Table subtotalTable = new Table(threeColumnWidth);
        subtotalTable.addCell(new Cell().add("").setBorder(Border.NO_BORDER)).setMarginLeft(10f);
        subtotalTable.addCell(new Cell().add("Subtotal").setTextAlignment(TextAlignment.CENTER).setBorder(Border.NO_BORDER));
        subtotalTable.addCell(new Cell().add("$" + totalSum).setTextAlignment(TextAlignment.RIGHT).setBorder(Border.NO_BORDER)).setMarginRight(15f);
        document.add(subtotalTable);

        Table voucherTable = new Table(threeColumnWidth);
        voucherTable.addCell(new Cell().add("").setBorder(Border.NO_BORDER)).setMarginLeft(10f);
        voucherTable.addCell(new Cell().add("Voucher").setTextAlignment(TextAlignment.CENTER).setBorder(Border.NO_BORDER));
        voucherTable.addCell(new Cell().add(order.getVoucherPercent() + "%").setTextAlignment(TextAlignment.RIGHT).setBorder(Border.NO_BORDER)).setMarginRight(15f);
        document.add(voucherTable);

        Table priceAfterVoucher = new Table(threeColumnWidth);
        priceAfterVoucher.addCell(new Cell().add("").setBorder(Border.NO_BORDER)).setMarginLeft(10f);
        priceAfterVoucher.addCell(new Cell().add("Member Ship Discount: ").setTextAlignment(TextAlignment.CENTER).setBorder(Border.NO_BORDER));
        priceAfterVoucher.addCell(new Cell().add(order.getCustomer().getMemberShipTier().getDiscountPercent() + "%").setTextAlignment(TextAlignment.RIGHT).setBorder(Border.NO_BORDER)).setMarginRight(15f);
        document.add(priceAfterVoucher);

        Table taxTable = new Table(threeColumnWidth);
        taxTable.addCell(new Cell().add("").setBorder(Border.NO_BORDER)).setMarginLeft(10f);
        taxTable.addCell(new Cell().add("Tax").setTextAlignment(TextAlignment.CENTER).setBorder(Border.NO_BORDER));
        taxTable.addCell(new Cell().add(order.getTax() + "%").setTextAlignment(TextAlignment.RIGHT).setBorder(Border.NO_BORDER)).setMarginRight(15f);
        document.add(taxTable);

        Table threeColTable6 = new Table(threeColumnWidth);
        threeColTable6.addCell(new Cell().add("").setBorder(Border.NO_BORDER)).setMarginLeft(10f);
        threeColTable6.addCell(new Cell().add("Total").setTextAlignment(TextAlignment.CENTER).setBorder(Border.NO_BORDER));
        threeColTable6.addCell(new Cell().add("$" + order.getTotalPrice()).setTextAlignment(TextAlignment.RIGHT).setBorder(Border.NO_BORDER)).setMarginRight(15f);
        document.add(threeColTable6);

        document.add(fullwidthDashedBorder(fullwidth));
        document.add(new Paragraph("\n"));
        document.add(getDividerTable(fullwidth).setBorder(new SolidBorder(Color.GRAY, 1)).setMarginBottom(15f));

    }

    public float getTotalSum(List<OrderItem> productList) {
        float result = 0;
        for(OrderItem orderItem : productList){
            result+=(float)orderItem.getQuantity()*orderItem.getPrice();
        }
        return result;
    }


    public void createTableHeader(ProductTableHeader productTableHeader) {
        Paragraph producPara = new Paragraph("Products");
        document.add(producPara.setBold());
        Table threeColTable1 = new Table(threeColumnWidth);
        threeColTable1.setBackgroundColor(Color.BLACK, 0.7f);

        threeColTable1.addCell(new Cell().add("Description").setBold().setFontColor(Color.WHITE).setBorder(Border.NO_BORDER));
        threeColTable1.addCell(new Cell().add("Quantity").setBold().setFontColor(Color.WHITE).setTextAlignment(TextAlignment.CENTER).setBorder(Border.NO_BORDER));
        threeColTable1.addCell(new Cell().add("Price").setBold().setFontColor(Color.WHITE).setTextAlignment(TextAlignment.RIGHT).setBorder(Border.NO_BORDER)).setMarginRight(15f);
        document.add(threeColTable1);
    }

    public void createAddress(AddressDetails addressDetails) {
        float fullwidth[] = {twocol + twocol};
        Table addressTable = new Table(fullwidth);

        // Thêm thông tin thanh toán (Billing Information)
        addressTable.addCell(new Cell().add(addressDetails.getBillingInfoText()).setBold().setFontSize(12f).setBorder(Border.NO_BORDER));
        addressTable.addCell(new Cell().add("").setBorder(Border.NO_BORDER)); // ô trống để cân bằng bảng

        // Thêm tên công ty
        addressTable.addCell(new Cell().add(addressDetails.getBillingCompanyText()).setFontSize(10f).setBorder(Border.NO_BORDER));
        addressTable.addCell(new Cell().add(addressDetails.getBillingCompany()).setFontSize(10f).setBorder(Border.NO_BORDER));

        // Thêm tên người thanh toán
        addressTable.addCell(new Cell().add(addressDetails.getBillingNameText()).setFontSize(10f).setBorder(Border.NO_BORDER));
        addressTable.addCell(new Cell().add(addressDetails.getBillingName()).setFontSize(10f).setBorder(Border.NO_BORDER));

        // Thêm địa chỉ thanh toán
        addressTable.addCell(new Cell().add(addressDetails.getBillingAddressText()).setFontSize(10f).setBorder(Border.NO_BORDER));
        addressTable.addCell(new Cell().add(addressDetails.getBillingAddress()).setFontSize(10f).setBorder(Border.NO_BORDER));

        // Thêm email thanh toán
        addressTable.addCell(new Cell().add(addressDetails.getBillingEmailText()).setFontSize(10f).setBorder(Border.NO_BORDER));
        addressTable.addCell(new Cell().add(addressDetails.getBillingEmail()).setFontSize(10f).setBorder(Border.NO_BORDER));

        document.add(addressTable.setMarginBottom(10f));
        document.add(fullwidthDashedBorder(fullwidth));
    }


    public void createHeader(HeaderDetails header) {
        Table table = new Table(twocolumnWidth);
        table.addCell(new Cell().add(header.getInvoiceTitle()).setFontSize(20f).setBorder(Border.NO_BORDER).setBold());
        Table nestedtabe = new Table(new float[]{twocol / 2, twocol / 2});
        nestedtabe.addCell(getHeaderTextCell(header.getInvoiceNoText()));
        nestedtabe.addCell(getHeaderTextCellValue(header.getInvoiceNo()));
        nestedtabe.addCell(getHeaderTextCell(header.getInvoiceDateText()));
        nestedtabe.addCell(getHeaderTextCellValue(header.getInvoiceDate()));
        table.addCell(new Cell().add(nestedtabe).setBorder(Border.NO_BORDER));
        Border gb = new SolidBorder(header.getBorderColor(), 2f);
        document.add(table);
        document.add(getNewLineParagraph());
        document.add(getDividerTable(fullwidth).setBorder(gb));
        document.add(getNewLineParagraph());
    }


    public List<OrderItem> modifyProductList(List<OrderItem> productList) {
        Map<String, OrderItem> map = new HashMap<>();
        productList.forEach((i) -> {
            map.put(i.getProduct().getProductName(), i);
        });
        return map.values().stream().collect(Collectors.toList());

    }

    static Table getDividerTable(float[] fullwidth) {
        return new Table(fullwidth);
    }

    static Table fullwidthDashedBorder(float[] fullwidth) {
        Table tableDivider2 = new Table(fullwidth);
        Border dgb = new DashedBorder(Color.GRAY, 0.5f);
        tableDivider2.setBorder(dgb);
        return tableDivider2;
    }

    static Paragraph getNewLineParagraph() {
        return new Paragraph("\n");
    }

    static Cell getHeaderTextCell(String textValue) {

        return new Cell().add(textValue).setBold().setBorder(Border.NO_BORDER).setTextAlignment(TextAlignment.RIGHT);
    }

    static Cell getHeaderTextCellValue(String textValue) {


        return new Cell().add(textValue).setBorder(Border.NO_BORDER).setTextAlignment(TextAlignment.LEFT);
    }

    static Cell getBillingandShippingCell(String textValue) {

        return new Cell().add(textValue).setFontSize(12f).setBold().setBorder(Border.NO_BORDER).setTextAlignment(TextAlignment.LEFT);
    }

    static Cell getCell10fLeft(String textValue, Boolean isBold) {
        Cell myCell = new Cell().add(textValue).setFontSize(10f).setBorder(Border.NO_BORDER).setTextAlignment(TextAlignment.LEFT);
        return isBold ? myCell.setBold() : myCell;

    }


}
