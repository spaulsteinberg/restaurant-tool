# Table of Contents

- [Overview](#overview)
- [Dashboard](#dashboard)
- [Ordering Table](#ordering)
- [Inventory Tracker](#inventory)
- [Profile and Goals](#profile-goals)
- [Menu Management](#menu-management)
- [Home Screen Creation](#home-screen)
- [Security, Users, and Permissions](#security)
- [Tools and Technology](#tools-and-technology)

<a name="overview"></a>
## Overview

This project conceptualizes a business idea: A quick, painless way to allow small businesses to quickly spin off a restaurant website, complete with an online ordering service and an administration tool (Admin tool). This repository highlights the Admin tool functionalities - see [this repository](https://github.com/spaulsteinberg/restaurant-customer) for the ordering website. This tool controls the content a customer will see in real-time: It's where menus can be created and configured, items to be ordered are customized, and eye-grabbing home screens are be built to the last detail. Additionally, inventory tracking is enabled if a user desires to track it digitally, and the dashboard contains visually appealing and easy to understand charts to view data. All restaurant ordering data is freely available to the users. Its their data, so all of it is available. 

<a name="dashboard"></a>
## Dashboard

![Login to Dashboard](img/login_to_dash_vid.gif)

On a successful login, the dashboard is the first visible screen. Get statistics on weekly revenue, order, and average sale price at a glance with the dashboard top bar. Look below on desktop and scroll down on a mobile screen to get analytical charts on orders, revenue, and food and beverage consumption. These are helpful to make business decisions based off what sells, and what flops with customers. Additionally, the progress of any personal order/revenue goals will be displayed on this screen.

<a name="ordering"></a>
## Ordering Table

![Ordering Demo](img/order-demo.gif)

View orders by a weekly, monthly, tri-monthly, or yearly basis. Visible in the table is the receipt number, name on the order, email, date, amount, and link to view the full receipt. Features include ascending/descending sort and search bar based off receipt number to quickly locate unique orders. Orders are displayed in a user-friendly Material UI table with row and pagination options. Clicking on the 'View Order' link will show a more detailed order view than the table, along with the exact time and credit card (last 4 digits) used to complete the order. 

<a name="inventory"></a>
## Inventory Tracker

![Inventory Demo](img/inventory-demo.gif)

Search whats in stock, add to inventory, and/or edit what's already available. The Inventory tab allows you to do it all. Search by item name or filter by category for a more thorough search. Users with write or admin privileges are able to add new inventory items, edit the quantity or price of each item, or delete items. Items are displayed in a Material UI table with row and pagination options.

<a name="profile-goals"></a>
## Profile and Goals

![Profile Demo](img/profile-demo.gif)

Profile pages are user-specific. Any authenticated user can add a first and last names, restaurant name, and title. Emails are not editable, since they are used to determine a unique user. Admin users will also be able to edit user permissions on this page via the permissions modal. Goals are created by choosing a subject, timeable, and deliverable. Progress on these goals can be viewed in the dashboard. Goals re viewable, editable, and removable. This feature is completely on an individual basis and is optional.

<a name="menu-management"></a>
## Menu Management

![Menu Demo](img/menu-demo.gif)

The menu feature is what allows you to create the menus your customers see in realtime. What one might see here depends on access levels - A read-only user can only view the existing menus. A read+write user can view and edit menu items, change the current visible menu, and add/remove menus. Admin users have access to all of those features, in addition to configuring the home screen for the client view (see "Home Screen Creation" below). Menus are completely customizable and are progagated in realtime to the client. Menu titles, descriptions, sub-sections, and items are all easy to edit or remove. Tagging items with categories, pricing, etc. are all vital to accurate revenue and statistics, along with ensuring accurate pricing information on the client-side. Menus can be added and removed, and setting the current menu is as easy as moving a radio button. 

<a name="home-screen"></a>
## Home Screen Creation

An intriguing home screen goes a long way to bringing and keeping users to a website, and is usually what forms a first impression. This can have a significant effect on sales, so it is important that its done right. Here, you can set up a clear, attention grabbing background picture, a clear and suffice banner name, hoverable relative button links, a restaurant description, and helpful links. All of this is optional, of course, since it is up to the user to design their own page. Editable sections are clearly illustrated, and interactive modals exist to preview changes and find out what looks and fits best.

<a name="security"></a>
## Security, Users, and Permissions

All features are managed through Google Firebase Authentication, and includes logins, signing up new users, password resetting, and updating existing credentials. Signing up new users requires authenticated admin permissions, while updating existing credentials can be done by any authenticated user. Adding and removing authenticated users is easy: Simply sign up the new user with an optional set of permissions, and they will be given all allowed access. Permissions can be edited by any user with admin status via the profile page. Only admins can view and edit users, which does not include the super user (whoever created the main tool account).


## Tools and Technology

This project is completely written in React, with a few firebase functions here and there to add more security to data collections.
