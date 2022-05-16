# Company routes doc

Describes all routes involved in 'Company' entity

## Entity

```ts
interface Company: {
	id: number;
	name: string;
	created_at: Date;
	updated_at: Date;
}

interface ICompanyRequest {
	name: string;
}
```

## Routes

### Base path: /company

### List All Companies

- **Method:** GET
- **Path:** /
- **Parameters:** `NULL`
- **Query:** `NULL`
- **Body Type**: `NULL`
- **Response Type:** `Company[]`

### Creates a Company

- **Method:** POST
- **Path:** /
- **Parameters:** `NULL`
- **Query:** `NULL`
- **Body Type**: `ICompanyRequest`
- **Response Type:** `Company`

### Updates a Company

- **Method:** PUT
- **Path:** /:idCompany
- **Parameters:** `{ idCompany: number }`
- **Query:** `NULL`
- **Body Type**: `ICompanyRequest`
- **Response Type:** `Company`
