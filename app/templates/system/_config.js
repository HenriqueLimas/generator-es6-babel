System.config({
  "paths": {
    "*": "dist/*.js"<% if (hasBootstrap) { %>,
    "github:*": "jspm_packages/github/*.js"<% } %>
  }
});

<% if (hasBootstrap) { %>
System.config({
  "map": {
    "jquery": "github:components/jquery@2.1.3",
    "twbs/bootstrap": "github:twbs/bootstrap@3.3.4"
  }
});
<% } %>
