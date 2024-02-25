The url for web application is apexedd.com

Features of application
1. Navbar
   - Contains search feature where products can be searched, implemented using mongo query.
     keyword to check - "jeans".
   - Link to products where all products are found  which is implemented using server side filtering.
   - Option to register and login which changes to sign out on successfull login.
     Database user to check - "kelt1", "12345678"
   - Cart is implemented where user specific cart is feteched on login.
2. Categories
   - Category wise products can be fetched from server side.
3. Products
   - All products are listed with the application of pagination done using prev and next, which allows to only 
     fetch limited products at one time resulting in optimized querying.
   - Each product is with 2 options explore product and add to wishlist.

     <img src="https://github.com/sunilkmr210/E-shop/assets/87411181/a90b03f4-583b-40da-b7ec-7cf003ae78b1" style="width:850px; height:400px;">

    
4. Footer
    - After login "my account" option allow users to edit their account details.
    - User wishlist can be checked here.
5. Product
    - Redis is implemented for optimization of product fetching.
    - Product is displayed with description and options to choose color, size, quantity and add to cart which 
      is managed using redux thunk.

      <img src="https://github.com/sunilkmr210/E-shop/assets/87411181/153e032c-2483-4c92-97f1-1e1147ede6c3" style="width:850px; height:400px;">

      
5. Cart
    - Cart redux is used as there are some states of cart which are used in different components of app.
    - Cart added products are displayed where user have option to change thier quantity.
    - Stripe payment is done using checkout now and filling the details which on completion redirect to orders.

      <img src="https://github.com/sunilkmr210/E-shop/assets/87411181/3af2ba3a-2db9-45b4-9338-1523312527e3" alt="alt text" style="width:850px; height:400px;">


