export interface Customer {
  name: string;
  email: string;
  tax_id: string;
  phones: Phones[];
}

export interface  Phones {
  country: string;
  area: string;
  number: string;
  type: string;
}

export interface Item {
  "reference_id": string;
  "name": string;
  "quantity": number;
  "unit_amount": number;
}

export interface Address {
  "street": string;
  "number": string;
  "complement": string;
  "locality": string;
  "city": string;
  "region_code": string;
  "country": string;
  "postal_code": string;
}

export interface Addresses {
  "address": Address
}

export interface Amount {
  "value": number;
}

export interface QRCode {
  "amount": Amount;
}

export interface payload {
  "reference_id": string;
  "customer": Customer;
  "items":  Item[];
  "qr_codes": QRCode[];
  "shipping": Addresses;
  "billing": Addresses;
  "notification_urls": string[];
}

export interface card {
  "publicKey": string;
  "holder": string;
  "number": string;
  "expMonth": string;
  "expYear": string;
  "securityCode": string;
}

export interface charges {
  "reference_id": string,
  "description": string,
  "amount": Amount,
  "payment_method": {
      "type": "CREDIT_CARD",
      "installments": 1,
      "capture": true,
      "card": {
          "encrypted":"V++53ir0qvoK/rUSzNjCqP8Hz9ZTa+HohR779n63CV+NvCeYj4J4lQevL4NKN7Di3BxKQGqfQW5cfS7/4rHw4w8URuOV/j/mGau2GXxkKQ6/szJ6BQr//C4e4XgfCHDwcONQhuPDHMdOB1C+4lzyBbsPJUZ/8TUQrxhMMiMFjwGeg62uf7cUqdFjp+Q5dqJXwhLgH3d1EoX+JKStBLqVzF0lW3gHtFOyfvFhuxxBgB0xrzTKfbTqnL5aSYBoGXRFM0gLodMm6knx7bW+syThxyQffnaigCwj2aNohsu+fuXII+3WnlgrHQxaBx3ChRuWKy+loV2L2USiGulp/bPEcg==",
          "store": false
      },
      "holder": {
        "name": "Jose da Silva",
        "tax_id": "65544332211"
      }
  }
}
