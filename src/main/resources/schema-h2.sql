CREATE TABLE tree_node
(
    ID NUMBER(19) NOT NULL PRIMARY KEY,
    PARENT_ID  NUMBER(19) NOT NULL,
    NODE_TEXT VARCHAR2(100) NOT NULL,
    LEVEL NUMBER(10)
);