# Stripe Sample

## Installation

- :octocat:Clone this Github repository with `git clone https://github.com/Dlearn/stripe-sample.git`
- 📂 Navigate into the folder
- 📝 Run `yarn` to install dependencies
- ⚡ Run `yarn start` to concurrently run the server and client

## Stripe APIs

These features have been implemented in this website.

This repository creates a simple store where the user can select which items they want to purchase. When they proceed to the Checkout Page, the browser calls the server with the items in the cart. Then, the server calls Stripe to create a PaymentIntent, which is returned and stored in the browser to make the final payment.

Although the order summary table shows what items are in the cart, and how much will be charged, when the user sends a request to the server to create the Payment Intent, the amount is calculated again with the item prices on the server. This ensures that the user cannot tamper with the browser or request to manipulate the amount.

### Stripe.js available everywhere

To best leverage Stripe’s advanced fraud functionality, the Stripe.js package is loaded in the root page in the App. This allows Stripe to detect suspicious behavior that may be indicative of fraud as customers browse the website.

`import '@stripe/stripe-js';`

### Stripe Elements

For simplicity, this sample uses Stripe Elements, a set of prebuilt UI components for the checkout flow. Using Stripe Elements also allows us to easily integrate [other Payment Requests](#other-payment-requests) when we want to integrate them.

### 3D Secure

If 3DS is required, then Stripe Radar will automatically trigger the authentication flow in a modal pop-up.

### Confirmation Email

The User can optionally fill in their email address to receive a receipt of their purchase.

## Other considerations for an e-commerce store

These features are not implemented in this website, but are possible extensions.

### Saving credit card details

To minimize friction for the user, the company should save the credit card details for subsequent payments. This has not been implemented for this website because user accounts have not been implemented. Furthermore, to test locally, we would need to configure a proxy to test autofill due to browser's https rules, which is out of the scope of this simple website.

### Other Payment Requests

With Stripe Elements, Apple Pay, Google Pay and other payment requests can easily be implemented to allow users other forms of payment.

### Language and currency localization

For e-commerce shops that are in multiple countries, they have to implement both language localization, and currency localization for the store. This needs to be accounted for on the website, and on the calls made to Stripe. For this sample, we assume the language is always English, and the currency is always USD.

### Subscriptions

Some e-commerce shops implement subscriptions where the user's card is saved, and the user is charged at a regular interval (every month). This is supported by Stripe, but has not been implemented in this website.

## How double charging is prevented

There are several ways a user can be double charged for their transaction. These are some of the cases and how they are addressed:

1. User clicks on submit twice

When the submit button is clicked, the app `setProcessing(true)` and disables the submit button. So submitting the form twice should be impossible. If the user somehow submits the form twice, the client would send the same clientSecret, and Stripe will throw an exception for the 2nd submit request, and the user will not be charged twice.

2. User submits the form, the request goes through, but the client does not transition to the success page, and the user submits the form again

In the unlikely case that this happens, the client would send the same clientSecret, and Stripe will throw an exception for the 2nd submit request, and the user will not be charged twice.
