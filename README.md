# bootcamp_homework week 1

## Code Refactor

In this project, I reviewed and refactored existing html and css code to ensure the associated webpage is accessible for all audiences. The instructions and standards expected from the project were presented in the form of a user story and acceptance criteria.

## User Story


AS A marketing agency<br>
I WANT a codebase that follows accessibility standards<br>
SO THAT our own site is optimized for search engines<br><br>

The user story set out the overall objective and purpose of the refactoring project. The specific tasks were outlined in the acceptance criteria.

## Acceptance Criteria

GIVEN a webpage meets accessibility standards<br>
WHEN I view the source code<br>
THEN I find semantic HTML elements<br>
WHEN I view the structure of the HTML elements<br>
THEN I find that the elements follow a logical structure independent of styling and positioning<br>
WHEN I view the image elements<br>
THEN I find accessible alt attributes<br>
WHEN I view the heading attributes<br>
THEN they fall in sequential order<br>
WHEN I view the title element<br>
THEN I find a concise, descriptive title<br><br>

I approached each of the criteria as follows:<br>
<ol><li>
<strong>Semantic elements</strong> - I looked through all of the html code to identify any non-semantic elements such as div tags and assessed the content contained within these tags to determine whether any of the semantic elements (e.g. header, article etc.) could be used in its place. The semantic elements provide meaningful information regarding to the layout to anyone viewing the code.</li>
<li><strong>Structure</strong> - In order to test this acceptance criteria, I was looking at the order of the html elements, ensuring that the <head> tag wa followed by the <body> tag and all of the content was contained within the body. Then I checked that all of the semantic elements were structured and ordered correctly e.g. header followed by article followed by footer. I also looked through the code to ascertain whether indentation was correct and all opening tags were indented at the same level as their paired closing tags. Ensuring the structure of the code is intelligible and readable means that future developers could review and update the code more easily and more quickly</li>
<li><strong>Alt attributes</strong> - I identified all img elements in the html and added an alt attribute with accessible text to aid those with visual impairments and to cater for images being removed by the companies that provide them. I also added a title attribute to the hero div as a way of adding alt text to an image added through CSS.</li>
<li><strong>Heading attributes</strong> - All heading attributes were checked to make sure they were in order from h1 to h6. The final heading attribute in the source code was out of order, so this h2 tag was changed to h4 to reconcile the sequence in the rest of the code. This change helps keep a logical structure to the code which can then be easily followed by any developer working on it.</li>
<li><strong>Title</strong> - The title of the html before its refactoring was not very descriptive (webpage), so I changed this to 'Horiseon Business Website' to add more meaning of the context and the specific company the site relates to, while not making the title too complicated. It is important that this title is clear and descriptive because the title element defines a title in the browser toolbar, provides a title for the page when it is added to favorites and displays a title for the page in search-engine results</li>
</ol>

## Challenges

During this project, I faced numerous challenges. The main challenge was concerning making changes to the html and css code without affecting the look or functionality of the page. Therefore, any changes that were made to the html, corresponding changes needed to be made to the corresponding selector in the CSS file to prevent the styling from failing.<br><br>

Another challenge was concerning effective version control through repeated commits to GitHub. It was necessary to get into a habit approaching each acceptance criteria one-by-one, making the changes to the code and committing the changes with a descriptive message. I understand why this is a useful endeavour as it is now useful to see the history of the changes made to this code, which will help when any debugging is required.<br><br>

## What did I learn?

I learned how to refactor code to make the page and the code itself more accessible to the user and any future developers, respectively. Each of the acceptance criteria in the initial project readme file can be applied to all code that I wil be working on in the future to ensure it is as streamlined, structured and accessible as possible.
