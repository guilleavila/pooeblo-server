
# Pooeblo

A brief description of what this project does and who it's for







## API Reference

#### SERVER

```http
  AUTH /api/auth
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `POST` | `/user-signup` | User Signup ✅ |
| `POST` | `/village-signup` | Village Signup ✅ |
| `POST` | `/login` | Login ✅ |
| `POST` | `/verify` | ✅  |

```http
  USERS /api/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/:user_id` | Get User Details ✅|
| `PUT` | `/:user_id/edit` | Edit User ✅|
| `DELETE` | `/:user_id/delete` | Delete User ✅|
| `GET` | `/:user_id` | Get User's Properties ✅|

```http
  VILLAGES /api/villages/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/` | Get All Villages ✅ |
| `GET` | `/:village_id` | Get One Village ✅ |
| `PUT` | `/:village_id/edit-info` | Edit Village Info ✅ |
| `PUT` | `/:village_id/edit-features` | Edit Village Features ✅ |
| `DELETE` | `/:village_id/delete` | Delete Village ✅ |
| `PUT` | `/:village_id/follow` | Follow Village ✅ |
| `PUT` | `/:village_id/unfollow` | Unfollow Village ✅ |
| `GET` | `/:village_id/houses` | Get All Houses for One Village ✅ |
| `GET` | `/:village_id/subscriptions` | Get All Subscriptions for One Village ✅ |


```http
  HOUSES /api/houses/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/` | Get All Houses ✅ |
| `GET` | `/:house_id` | Get One House ✅ |
| `POST` | `/create` | Create House ✅ |
| `PUT` | `/:house_id/edit` | Edit House ✅ |
| `DELETE` | `/:house_id/delete` | Delete House ✅ |
| `PUT` | `/:house_id/add-to-fav` | Add House to favs ✅ |
| `PUT` | `/:house_id/subtract-from-fav` | Subtract House from favs ✅ |
| `GET` | `/:house_id/get-all-bookings` | Get All Bookings for One House ✅ |


```http
  SUBSCRIPTIONS /api/subscriptions/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/` | Get All Subscriptions for One User ✅ |
| `POST` | `/create` | Create Subscription ✅ |
| `DELETE` | `/:subscription_id/delete` | Cancel Subscription ✅ |


```http
  BOOKINGS /api/bookings/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/:booking_id` | Get One Booking ✅ |
| `POST` | `/create` | Create Booking ✅ |
| `DELETE` | `/:booking_id/delete` | Delete Booking ✅ |
| `PUT` | `/:booking_id/edit` | Edit Booking |




#### CLIENT

```http
  HOME
```

| Type     | Description                |
| :------- | :------------------------- |
| `/` | Home |


```http
  PUEBLOS Y CASAS
```
| Type     | Description                |
| :------- | :------------------------- |
| `/pueblos` | Pueblo's search results |
| `pueblos/:pueblo_id`' | Pueblo's details |
| `/pueblos/:pueblo_id/casas` | Pueblo's houses |
| `/pueblos/:pueblo_id/casas/:casa_id` | House detail's |
| `/pueblos/:pueblo_id/casas/:casa_id/reservar` | Rent house |


```http
  PERFILES
```

| Type     | Description                |
| :------- | :------------------------- |
| `/mi-perfil/:user_id` | User's profile |
| `/mi-perfil/:user_id/reserva/reserva_id` | User's bookings |



## Authors

- [Guillermo Ávila & Inés García]

