export enum Roles {
  DOCTOR = "doctor",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
  NURSE = "nurse",
  STAFF = "staff",
}

export enum HttpResponseCodes {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum HTTPHeader {
  ACCEPT = "Accept",
  CONTENT_TYPE = "Content-Type",
  AUTHORIZATION = "Authorization",
}

export enum HTTPContentType {
  APPLICATION_JSON = "application/json",
  TEXT_HTML = "text/html",
  MULTIPART = "multipart/form-data",
}

