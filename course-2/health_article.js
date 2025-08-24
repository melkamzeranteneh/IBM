// Create a new XMLHttpRequest object to make HTTP requests
var xhr = new XMLHttpRequest();

// Define the URL of the JSON file containing the health articles data
var url = './health_article.json';

// Open a GET request to the specified URL asynchronously (true means async)
xhr.open('GET', url, true);

// Set the response type to 'json' so the browser automatically parses the JSON response
xhr.responseType = 'json';

// Define what happens when the request completes successfully
xhr.onload = function() {
  // Check if the request was successful (HTTP status 200 = OK)
  if (xhr.status === 200) {
    // Extract the articles array from the JSON response
    var articles = xhr.response.articles;
    
    // Get the HTML element where we'll display the articles
    var articlesDiv = document.getElementById('articles');
    
    // Loop through each article in the articles array
    articles.forEach(function(article) {
      // Create a new div element to contain each individual article
      var articleDiv = document.createElement('div');
      
      // Add the 'article' CSS class to style this div
      articleDiv.classList.add('article');

      // Create an h2 element for the article title
      var title = document.createElement('h2');
      
      // Set the text content of the title to the article's title
      title.textContent = article.title;

      // Create a paragraph element for the article description
      var description = document.createElement('p');
      
      // Set the text content of the description to the article's description
      description.textContent = article.description;

      // Create an h3 element for the "Ways to Achieve" section header
      var waysHeader = document.createElement('h3');
      
      // Set the text content of the ways header
      waysHeader.textContent = 'Ways to Achieve:';

      // Create an unordered list element for the ways to achieve
      var waysList = document.createElement('ul');
      
      // Loop through each way in the ways_to_achieve array
      article.ways_to_achieve.forEach(function(way) {
        // Create a new list item element for each way
        var listItem = document.createElement('li');
        
        // Set the text content of the list item to the way description
        listItem.textContent = way;
        
        // Add the list item to the ways list
        waysList.appendChild(listItem);
      });

      // Create an h3 element for the "Benefits" section header
      var benefitsHeader = document.createElement('h3');
      
      // Set the text content of the benefits header
      benefitsHeader.textContent = 'Benefits:';

      // Create an unordered list element for the benefits
      var benefitsList = document.createElement('ul');
      
      // Loop through each benefit in the benefits array
      article.benefits.forEach(function(benefit) {
        // Create a new list item element for each benefit
        var listItem = document.createElement('li');
        
        // Set the text content of the list item to the benefit description
        listItem.textContent = benefit;
        
        // Add the list item to the benefits list
        benefitsList.appendChild(listItem);
      });

      // Add all the created elements to the article div in the correct order
      articleDiv.appendChild(title);           // Add the title first
      articleDiv.appendChild(description);     // Add the description second
      articleDiv.appendChild(waysHeader);      // Add the ways header third
      articleDiv.appendChild(waysList);        // Add the ways list fourth
      articleDiv.appendChild(benefitsHeader);  // Add the benefits header fifth
      articleDiv.appendChild(benefitsList);    // Add the benefits list sixth

      // Add the complete article div to the main articles container
      articlesDiv.appendChild(articleDiv);
    });
  } else {
    // If the request failed (status is not 200), log an error message
    console.error('Failed to load articles. Status:', xhr.status);
    
    // Display an error message to the user in the articles container
    document.getElementById('articles').innerHTML = '<p>Error loading articles. Please try again later.</p>';
  }
};

// Define what happens if the request fails (network error, etc.)
xhr.onerror = function() {
  // Log an error message to the console
  console.error('Request failed');
  
  // Display an error message to the user in the articles container
  document.getElementById('articles').innerHTML = '<p>Error loading articles. Please check your connection and try again.</p>';
};

// Send the HTTP request to the server
xhr.send();