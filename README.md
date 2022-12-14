# Blog-Backend

#### Logowanie
```http
  POST /auth/login
```

| Parametr | Typ  | Opis                            |
| :-------- | :------- | :------------------------- |
| `email` | `string`   | **Wymagany**               |
| `password` | `string`| **Wymagany**               |

#### Rejestracja

```http
  POST /auth/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Wymagany**. 3-30 znaków |
| `name`      | `string` | **Wymagany**. 5-25 znaków |
| `password`      | `string` | **Wymagany**. 5-25 znaków |


#### Wyciąganie nazwy użytkownika po ID

```http
    GET /users/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Wymagany**|

#### Wyciąganie posta po ID

```http
    GET /posts/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Wymagany**|

#### Dodawanie postów

```http
    POST /posts/addPost
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Header['Authorization']`      | `Bearer` | **Wymagany** |
| `author_id`      | `int` | **Wymagany** |
| `category_id`      | `int` | Opcjonalny  |
| `title`      | `string` | **Wymagany**  |
| `content`      | `string` | **Wymagany**  |

#### Usuwanie postów

```http
    DELETE /posts/deletePost
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Header['Authorization']`      | `Bearer` | **Wymagany** z wartością ismod = true|
| `post_id`      | `int` | **Wymagany** |

#### Edycja postów

```http
    PATCH /posts/editPost
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Header['Authorization']`      | `Bearer` | **Wymagany** z wartością ismod = true|
| `post_id`      | `int` | **Wymagany** |
| `title`      | `string` | Opcjonalny |
| `category_id`      | `string` | Opcjonalny |
| `content`      | `string` | Opcjonalny |
| `likes`      | `string` | Opcjonalny |