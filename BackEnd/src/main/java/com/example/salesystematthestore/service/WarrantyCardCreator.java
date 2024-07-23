package com.example.salesystematthestore.service;

import com.example.salesystematthestore.entity.Order;
import com.example.salesystematthestore.entity.OrderItem;
import com.example.salesystematthestore.entity.Product;
import com.example.salesystematthestore.entity.WarrantyCard;
import com.example.salesystematthestore.repository.WarrantyCardRepository;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.color.DeviceRgb;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.border.Border;
import com.itextpdf.layout.border.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class WarrantyCardCreator {
    Document document;
    PdfDocument pdfDocument;
    String pdfName;

    public WarrantyCardCreator(String pdfName) {
        this.pdfName = pdfName;
    }

    public WarrantyCardCreator() {
    }

    public void createDocument() throws IOException {
        PdfWriter pdfWriter = new PdfWriter(pdfName);
        pdfDocument = new PdfDocument(pdfWriter);
        pdfDocument.setDefaultPageSize(PageSize.A4);
        this.document = new Document(pdfDocument);
    }

    public void createHeader(String title) {
        Paragraph titleParagraph = new Paragraph(title)
                .setBold()
                .setFontSize(28f)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(20);
        document.add(titleParagraph);
    }

    public void createWarrantyDetails(String customerName, String productName, String warrantyPeriod, String serialNumber, String purchaseDate, String expiredDate, String orderId) {
        float[] columnWidths = {200f, 250f};
        Table table = new Table(columnWidths);

        table.addCell(new Cell().add("Order ID:").setBold().setBorder(Border.NO_BORDER).setBackgroundColor(new DeviceRgb(224, 224, 224)));
        table.addCell(new Cell().add(orderId).setBorder(Border.NO_BORDER).setBackgroundColor(new DeviceRgb(240, 240, 240)));


        table.addCell(new Cell().add("Customer Name:").setBold().setBorder(Border.NO_BORDER).setBackgroundColor(new DeviceRgb(224, 224, 224)));
        table.addCell(new Cell().add(customerName).setBorder(Border.NO_BORDER).setBackgroundColor(new DeviceRgb(240, 240, 240)));

        table.addCell(new Cell().add("Product Name:").setBold().setBorder(Border.NO_BORDER).setBackgroundColor(new DeviceRgb(224, 224, 224)));
        table.addCell(new Cell().add(productName).setBorder(Border.NO_BORDER).setBackgroundColor(new DeviceRgb(240, 240, 240)));

        table.addCell(new Cell().add("Warranty Period:").setBold().setBorder(Border.NO_BORDER).setBackgroundColor(new DeviceRgb(224, 224, 224)));
        table.addCell(new Cell().add(warrantyPeriod).setBorder(Border.NO_BORDER).setBackgroundColor(new DeviceRgb(240, 240, 240)));

        table.addCell(new Cell().add("Serial Number:").setBold().setBorder(Border.NO_BORDER).setBackgroundColor(new DeviceRgb(224, 224, 224)));
        table.addCell(new Cell().add(serialNumber).setBorder(Border.NO_BORDER).setBackgroundColor(new DeviceRgb(240, 240, 240)));

        table.addCell(new Cell().add("Purchase Date:").setBold().setBorder(Border.NO_BORDER).setBackgroundColor(new DeviceRgb(224, 224, 224)));
        table.addCell(new Cell().add(purchaseDate).setBorder(Border.NO_BORDER).setBackgroundColor(new DeviceRgb(240, 240, 240)));

        table.addCell(new Cell().add("Expired Date:").setBold().setBorder(Border.NO_BORDER).setBackgroundColor(new DeviceRgb(224, 224, 224)));
        table.addCell(new Cell().add(expiredDate).setBorder(Border.NO_BORDER).setBackgroundColor(new DeviceRgb(240, 240, 240)));

        table.setBorder(new SolidBorder(1));  // Add border around the table
        document.add(table);
    }

    public void createFooter(String termsAndConditions) {
        Paragraph footerParagraph = new Paragraph(termsAndConditions)
                .setFontSize(10f)
                .setTextAlignment(TextAlignment.LEFT)
                .setMarginTop(20);
        document.add(footerParagraph);
    }

    public void addLogo(String logoPath) throws IOException {
        Image logo = new Image(ImageDataFactory.create(logoPath))
                .setWidth(100)
                .setHeight(100)
                .setFixedPosition(450, 750);
        document.add(logo);
    }

    public void save(String fileName) throws IOException {
        document.close();
        pdfDocument.close();

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

        Files.delete(localFilePath);
    }

    public String createWarrantyCard(WarrantyCard warrantyCard) {
        String url = "";
        Order order = warrantyCard.getOrderItem().getOrder();
        Product product = warrantyCard.getOrderItem().getProduct();
        String orderDate = transferDate(order.getOrderDate());
        String expiredDate = transferDate(warrantyCard.getExpiredDate());

        try {
            WarrantyCardCreator creator = new WarrantyCardCreator(warrantyCard.getId() + ".pdf");
            creator.createDocument();
            creator.createHeader("Warranty Card");
            creator.createWarrantyDetails(order.getCustomer().getName(), product.getProductName(), product.getWarranty().getTerms() + " Years", warrantyCard.getId() + "", orderDate, expiredDate,""+order.getId());
            creator.createFooter("### Warranty Terms and Conditions\n" +
                    "1. **Warranty Coverage:** This product is warranted free from manufacturing defects for a period of [number of years] years from the date of purchase.\n" +
                    "2. **Warranty Conditions:** The warranty applies only to products that are intact, with no signs of external or third-party tampering. The product must be used properly according to the usage instructions.\n" +
                    "3. **Exclusions from Warranty:**\n" +
                    "   - Damage caused by strong impact, dropping, exposure to chemicals, high temperatures, or adverse environmental conditions.\n" +
                    "   - Natural wear and tear due to daily use.\n" +
                    "   - Altered, non-authorized repaired, or lost products.\n" +
                    "4. **Warranty Procedure:**\n" +
                    "   - Customers must present the warranty card and purchase receipt when requesting warranty service.\n" +
                    "   - The product will be sent to the store for inspection and evaluation.\n" +
                    "   - The warranty process usually takes [number of days] to [number of days] working days.\n" +
                    "5. **Customer Rights:**\n" +
                    "   - Free repair or replacement for technical defects covered by the warranty.\n" +
                    "   - In case the product cannot be repaired or is no longer in production, the customer will be exchanged for an equivalent product or refunded the current value of the product.\n" +
                    "6. **Customer Responsibilities:**\n" +
                    "   - Carefully maintain the product, avoid impacts, exposure to chemicals, and adverse environmental conditions.\n" +
                    "   - Read and follow the product usage instructions.\n" +
                    "7. **Warranty Contact:**\n" +
                    "   - For support, please contact our customer service department at +84988998249 or email antdnse170571@fpt.edu.vn.");
            creator.addLogo("src/main/resources/ce_logo_circle_transparent.png");
            creator.save(warrantyCard.getId() + ".pdf");
            url = "https://firebasestorage.googleapis.com/v0/b/four-gems.appspot.com/o/" + warrantyCard.getId() + ".pdf" + "?alt=media";
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("An error occurred while generating or saving the PDF");
        }
        return url;
    }


    private String transferDate(Date date){

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        String orderDateFormatted = dateFormat.format(date);

        return orderDateFormatted;

    }
}
