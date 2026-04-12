package com.io.crowdfunding.controller;

import com.io.crowdfunding.service.DonationService;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Value ("${stripe.secret.key}")
    private String stripeSecretKey;

    private final DonationService donationService;

    public PaymentController(DonationService donationService) {
        this.donationService = donationService;
    }

    @PostMapping("/create-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody Map<String, Object> data) {
        Stripe.apiKey = stripeSecretKey;
        try {
            System.out.println ("-----");
            System.out.println (data);
//            double amountDouble = ((Number) data.get("amount")).doubleValue();
            String amountStr = String.valueOf(data.get("amount"));
            double amountDouble = Double.parseDouble(amountStr);
            Long amount = (long) (amountDouble * 100);
            System.out.println ("-------------------");
            PaymentIntentCreateParams params =
                    PaymentIntentCreateParams.builder()
                            .setAmount(amount)
                            .setCurrency("inr")
                            .setAutomaticPaymentMethods(
                                    PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                            .setEnabled(true)
                                            .build()
                            )
                            .build();
            PaymentIntent intent = PaymentIntent.create(params);
            return ResponseEntity.ok(Map.of(
                    "clientSecret", intent.getClientSecret(),
                    "paymentIntentId", intent.getId()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    @PostMapping("/create-checkout-session")
public ResponseEntity<?> createCheckoutSession(@RequestBody Map<String, Object> data) {
    Stripe.apiKey = stripeSecretKey;
    try {
        // 1. Fixed amount parsing
        Double amountDouble = Double.valueOf(data.get("amount").toString());
        Long amount = (long) (amountDouble * 100);

        // 2. Fixed projectId parsing (Apply the same logic here!)
        Long projectId = Long.valueOf(data.get("projectId").toString());

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                // Redirect URLs back to your React app
                .setSuccessUrl("http://localhost:5173/project/" + projectId + "?success=true")
                .setCancelUrl("http://localhost:5173/project/" + projectId + "?canceled=true")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("inr")
                                .setUnitAmount(amount)
                                .setProductData( SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Donation to Project ID: " + projectId)
                                        .build())
                                .build())
                        .build())
                .build();

        Session session = Session.create(params);

        return ResponseEntity.ok(Map.of("url", session.getUrl()));
    } catch (Exception e) {
        e.printStackTrace ();
        return ResponseEntity.status(500).body(e.getMessage());
    }
}
//    @PostMapping("/create-checkout-session")
//    public ResponseEntity<?> createCheckoutSession(@RequestBody Map<String, Object> data) {
//        Stripe.apiKey = stripeSecretKey;
//        try {
//    //        Double amountDouble = ((Number) data.get("amount")).doubleValue();
//        Double amountDouble = Double.valueOf(data.get("amount").toString());
//        Long amount = (long) (amountDouble * 100);
//        Long projectId = ((Number) data.get("projectId")).longValue();
//        SessionCreateParams params = SessionCreateParams.builder()
//                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
//                .setMode(SessionCreateParams.Mode.PAYMENT)
//                // Redirect URLs back to your React app
//                .setSuccessUrl("http://localhost:5173/project/" + projectId + "?success=true")
//                .setCancelUrl("http://localhost:5173/project/" + projectId + "?canceled=true")
//                .addLineItem(SessionCreateParams.LineItem.builder()
//                        .setQuantity(1L)
//                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
//                                .setCurrency("inr")
//                                .setUnitAmount(amount)
//                                .setProductData( SessionCreateParams.LineItem.PriceData.ProductData.builder()
//                                        .setName("Donation to Project ID: " + projectId)
//                                        .build())
//                                .build())
//                        .build())
//                .build();
//
//            Session session = Session.create(params);
//
//            // Return the Stripe URL to the frontend
//            return ResponseEntity.ok(Map.of("url", session.getUrl()));
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body(e.getMessage());
//        }
//    }
}
//    @PostMapping("/confirm/{projectId}")
//    public ResponseEntity<?> confirmDonation(
//            @PathVariable Long projectId,
//            @RequestBody Map<String, Object> data) {
//
//        try {
//                //  SAFE amount parsing
//                Object amountObj = data.get("amount");
//                Double amount;
//                if (amountObj instanceof Number) {
//                    amount = ((Number) amountObj).doubleValue();
//                } else {
//                    amount = Double.parseDouble(amountObj.toString());
//                }
//                  //  Get paymentId
//                String paymentIntentId = data.get("paymentIntentId").toString();
//                    donationService.saveSuccessfulDonation(projectId, amount, paymentIntentId);
//                    return ResponseEntity.ok("Donation saved");
//                } catch (Exception e) {
//                    return ResponseEntity.status(500).body(e.getMessage());
//            }
//        }



//    @PostMapping("/create-intent")
//    public ResponseEntity<?> createPaymentIntent(@RequestBody Map<String, Object> data) {
//        Stripe.apiKey = stripeSecretKey;
//
//        try {
//            // Stripe expects amounts in cents/paise (Double to Long)
//            //Long amount = ((Number) data.get("amount")).longValue() * 100;
//                Object amountObj = data.get("amount");
//                Double amountDouble;
//                if (amountObj instanceof Number) {
//                    amountDouble = ((Number) amountObj).doubleValue();
//                } else {
//                    amountDouble = Double.parseDouble(amountObj.toString());
//                }
//                Long amount = (long) (amountDouble * 100);
//
//            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
//                    .setAmount(amount)
//                    .setCurrency("inr")
//                    .setAutomaticPaymentMethods(
//                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
//                            .setEnabled(true)
//                            .build()
//                    )
//                    .build();
//
//            PaymentIntent intent = PaymentIntent.create(params);
//
//            Map<String, String> responseData = new HashMap<> ();
//            responseData.put("clientSecret", intent.getClientSecret());
//            return ResponseEntity.ok(responseData);
//        } catch (StripeException e) {
//            return ResponseEntity.status(500).body(e.getMessage());
//        }
//    }