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

@Service
public class WarrantyCardCreator {
    Document document;
    PdfDocument pdfDocument;
    String pdfName;

    @Autowired
    private WarrantyCardRepository warrantyCardRepository;

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

    public void createWarrantyDetails(String customerName, String productName, String warrantyPeriod, String serialNumber, String purchaseDate) {
        float[] columnWidths = {200f, 250f};
        Table table = new Table(columnWidths);

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
        try {
            WarrantyCardCreator creator = new WarrantyCardCreator(warrantyCard.getId() + ".pdf");
            creator.createDocument();
            creator.createHeader("Warranty Card");
            creator.createWarrantyDetails(order.getCustomer().getName(), product.getProductName(), product.getWarranty().getTerms() + " Years", warrantyCard.getId() + "", order.getOrderDate().toString());
            creator.createFooter("Terms and conditions apply.");
            creator.addLogo("src/main/resources/ce_logo_circle_transparent.png");
            creator.save(warrantyCard.getId() + ".pdf");
            url = "https://firebasestorage.googleapis.com/v0/b/four-gems.appspot.com/o/" + warrantyCard.getId() + ".pdf" + "?alt=media";
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("An error occurred while generating or saving the PDF");
        }
        return url;
    }
}
