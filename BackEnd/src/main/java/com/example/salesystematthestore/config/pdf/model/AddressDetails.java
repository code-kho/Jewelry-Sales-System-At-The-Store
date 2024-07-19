package com.example.salesystematthestore.config.pdf.model;

import com.example.salesystematthestore.utils.ConstantUtil;
import com.itextpdf.kernel.color.Color;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AddressDetails {

    private String billingInfoText = ConstantUtil.BILLING_INFO;
    private String shippingInfoText = ConstantUtil.SHIPPING_INFO;
    private String billingCompanyText = ConstantUtil.BILLING_COMPANY;
    private String billingCompany = ConstantUtil.EMPTY;
    private String billingNameText = ConstantUtil.BILLING_NAME;
    private String billingName = ConstantUtil.EMPTY;
    private String billingAddressText = ConstantUtil.BILLING_ADDRESS;
    private String billingAddress = ConstantUtil.EMPTY;
    private String billingEmailText = ConstantUtil.BILLING_EMAIL;
    private String billingEmail = ConstantUtil.EMPTY;

    private String shippingNameText = ConstantUtil.SHIPPING_NAME;
    private String shippingName = ConstantUtil.EMPTY;
    private String shippingAddressText = ConstantUtil.SHIPPING_ADDRESS;
    private String shippingAddress = ConstantUtil.EMPTY;
    private Color borderColor = Color.GRAY;


    public AddressDetails build() {
        return this;
    }

}