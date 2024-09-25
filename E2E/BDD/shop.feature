Feature: Ecommerce shopping
  Scenario: Purchase products
    Given I Visit the url
    When I add products to Cart
    And Validate the total
    Then Select the location and confirm delivery