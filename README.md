The url for web application is apexedd.com

Features of application
1. Navbar
   - Contains search feature where products can be searched, implemented using mongo query.
     keyword to check - "jeans".
   - Link to products where all products are found and there is server side filtering is implemented.
   - Option to register and login which changes to sign out on successfull login.
     Database user to check - "kelt1", "12345678"
   - Cart is implemented where user specific cart is feteched on login.
2. Categories
   - Category wise products can be fetched from server side.
3. Products
   - All products are listed with the application of pagination done using prev and next, which allows to only 
     fetch limited products at one time as server side pagination is implemented.
   - Each product is with 2 options explore product and add to wishlist.
4. Footer
    - After login my account option allow users to edit their account details.
    - User wishlist can be checked here.
5. Product
    - Redis is implemented for optimization of product fetching.
    - Product is displayed with description and options to choose color, size, quantity and add to cart which 
      is managed using redux thunk.
5. Cart
    - Cart redux is used as there are some states of cart which are used in different components of app.
    - Cart added products are displayed where user have option to change thier quantity.
    - Stripe payment is done using checkout now and filling the details which on completion redirect to orders.
