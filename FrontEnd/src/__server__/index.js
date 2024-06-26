// THIS IS A FAKE SERVER FOR DEMO PURPOSE
// YOU SHOULD DO NOT FOLLOW THE CODE INSIDE __server__ or __db__
// HTTP CALL ARE MADE FROM utils/__api__
// PLEASE READ THE DOC https://bazaar-doc.netlify.app/mockserver
import Mock from "./mock";
import "./__db__/market-2";
import "./__db__/related-products";
import "./__db__/shop";
import "./__db__/sales";
import "./__db__/users";
import "./__db__/ticket";
import "./__db__/vendor";
import "./__db__/orders";
import "./__db__/address";
import "./__db__/products";
import "./__db__/dashboard";
Mock.onAny().passThrough();
