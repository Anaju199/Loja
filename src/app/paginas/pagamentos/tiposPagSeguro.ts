
export interface Customer {
  "name": string;
  "email": string;
  "tax_id": string;
  "phones": Phones;
}

export interface  Phones {
  "country": string;
  "area": string;
  "number": string;
  "type": string;
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
  amount: Amount;
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
