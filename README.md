# TreeManager
A Tree is a widely used data structure that simulates a hierarchical tree structure, with a root value and subtrees of children with a parent node.
This is a basic implementation of a Tree data structure in plain JavaScript using jQuery with DOM manipulation and combining with persisting Tree state in a database (it uses **H2 Embedded database**).

## Tree Manager JavaScript
- The Tree Manager JS is as self deployed and can be used in application/project as a third party component/library.
- It used callback methods which are something that you pass to a function, which tells it what it should call at some point in its operation. The code in the functions decides when to call the function (and what arguments to pass).
- It provides below Tree APIs
    - Add/remove Node(s) with and without DOM manipulation.
    - Creating hierarchical Tree user experience using JSON (from server).
    - Finding nodes in a Tree using DFS and BFS
    - Printing Tree Nodes as a flat and by level.
    - Basic UX indent with hyphen('-') to display parent-child relationship. 
- **Check the treeManager.js** under [resources] (src/main/resources/static/js/treeManager.js). **It is having good level of documentation**.


## Persisting Tree
- The project uses `Spring Boot` web for faster overall development.
- Uses `Thymeleaf` for the view layer of MVC.
- The REST APIs are exposed using `Spring REST`.
- It uses an `embedded database H2` here so no over the top Database configuration is required. Just build and work done. You can check the SQL script under src/main/resources: **schema-h2.sql**.
- The domain layer is using `Spring Data` for CRUD operations.
- Necessary `Unit Test cases` are written for testing CRUD operations.
- The data persistence can be checked by opening the URL in browser's incognito mode.
- But as an added advantage, you can access h2's console at: (http://localhost:8080/h2-console)
    - Simply type in the url jdbc:h2:mem:TEST;MVCC=true;DB_CLOSE_DELAY=-1;MODE=Oracle in JDBC URL field
    - The password shall be blank.
    - You can then see the TABLE TREE_NODE on the top left.


## Installation
- Clone or Download the TreeManager `$ git clone (https://github.com/dapinder-dhillon/TreeManager.git)`.
- To Build executable Spring Boot Jar:
```bash
    $ mvn clean install
```
- This will build executable `TreeManager-0.1.0.jar` inside target directory.
- Execute the JAR from command line:
```bash
    $ java -jar target\TreeManager-0.1.0.jar 
```
- To explicitly run Test Cases, execute mvn test (though the tests will run during build too.)
- Open browser and proceed to the URL: (http://localhost:8080/tree/home).
- Initially the page will be loaded with an empty Tree. Go ahead, add nodes and verify.

## Further Improvement
- All DOM manipulations locally at client side and submit once.
- Trim and post only CRUD operated nodes.
- Better validation and exception handling.
- Adding nodes at specified position.
- Better UX with CSS support.
