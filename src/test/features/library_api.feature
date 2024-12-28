Feature: Library API Testing
  To validate the functionality of the Library API for both user and admin roles.

  Background:
    Given the application is running at "http://localhost:7081"
  # Testing GET method
#   Scenario Outline: GET all books for both roles
#     Given I am logged in as "<role>"
#     When I send a GET request to "/api/books"
#     Then the response status code should be 200
#     And the response should contain the list of books
#     Examples:
#       | role  |
#       | admin |
#       | user  |
# Testing POST method with different payloads

  Scenario Outline: POST a new book with different payloads
    Given I am logged in as "<role>"
    When I send a POST request to "/api/books" with the following payload:
      """
      {
        "id": <id>,
        "title": "<title>",
        "author": "<author>"
      }
      """
    Then the response status code should be <statusCode>
    And the response body should <responseValidation>:
      """
      {
        "title": "<title>",
        "author": "<author>"
      }
      """

    Examples:
      | role  | id | title             | author              | statusCode | responseValidation       |
      | admin |  9 | The Great Gatsbyb | F. Scott Fitzgerald |        201 | contain the book details |
      | admin |    | The Great Gatsby  | F. Scott Fitzgerald |        201 | contain the book details |
    #   | admin |  2 |                  | F. Scott Fitzgerald |        400 | indicate a missing title error        |
    #   | admin |  3 | The Great Gatsby |                     |        400 | indicate a missing author error       |
    #   | admin | -1 | The Great Gatsby | F. Scott Fitzgerald |        400 | indicate invalid id error             |
    #   | user  |  4 | The Great Gatsby | F. Scott Fitzgerald |        401 | indicate an unauthorized access error |
  # Additional tests can be added here for PUT and DELETE methods.
