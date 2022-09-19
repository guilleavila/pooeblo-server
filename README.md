
# Pooeblo

![App Screenshot](https://user-images.githubusercontent.com/69345715/188492140-f6ad62f6-2afc-48dc-8fa8-8501f35b4b90.png)

Pooeblo is our final project of the Ironhack web development bootcamp. 
It is a SPA (Single Page Application) created with React, which consumes its data from a REST API (mongoDB) 
through an express server.

Our passion for villages and our desire to live in one of them led us to the idea 
of this project. Pooeblo was born with the aim of bringing young people closer to villages, 
without the need to invest in a property, and generating interest and benefit in villages 
with few inhabitants.

The users of the application can be both individuals and villages, who use the platform 
to make themselves known and attract new residents. 

People can search for villages, see their characteristics, and find out about available houses. 
If they are interested in any of them, they can create a subscription to that house, 
with a certain number of days to spend within a year. Reservations to the subscribed houses 
are managed individually and independently from the creation of the subscription.

Users can also publish their houses so that other users can subscribe and create bookings.


![app-screenshoot](https://user-images.githubusercontent.com/69345715/188492432-605d75d8-58c4-402d-8698-2bd6c32919da.png)

## Demo

[Try the app here!](https://pooeblo.netlify.app/)

## Technologies
MERN Stack: MongoDB, Express, React (w/ Hooks), Node

Javascript (ES6), HTML5, CSS3


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



## Server Usage

```bash
  npm i
  npm run dev
```


## Server .env variables


- PORT=5005
- ORIGIN=http://localhost:3000
- MONGODB_URI=CONNECTION_CLUSTER_GOES_HERE
- TOKEN_SECRET=TOKEN_SECRET_GOES_HERE
- CLOUDINARY_NAME=CLOUDINARY_NAME_GOES_HERE
- CLOUDINARY_KEY=CLOUDINARY_KEY_GOES_HERE
- CLOUDINARY_SECRET=CLOUDINARY_SECRET_GOES_HERE


## CLIENT

[Pooeblo-Client](https://github.com/guilleavila/pooeblo-client)

## Authors

- Inés García Periáñez - [@inesgarper](https://www.github.com/inesgarper)
- Guillermo Ávila Ayllón - [@guilleavila](https://www.github.com/guilleavila)


## 🔗 Links
Guillermo Ávila Ayylón 
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/guillermo-%C3%A1vila/)

Inés García Periáñez
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/inesgarper/)


## Additional Info

This project was elected by our classmates to compete in Ironhack's Hackshow, and won it!
![](https://media.giphy.com/media/w5GPJlLqBEQVC38y6C/giphy.gif)


