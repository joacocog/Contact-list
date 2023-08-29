<?php

function getContacts(){
    include 'db.php';
    
    try{

        return $conn->query("SELECT id, name, company, phone from contacts");

    }catch (Exception $e){
        echo "Error" . $e->getMessage() . "<br>";
        return false;
    }
}

// Get contact to edit

function getContactEdit($id){

    include 'db.php';
    
    try{

        return $conn->query("SELECT id, name, company, phone from contacts WHERE id = $id");

    }catch (Exception $e){
        echo "Error" . $e->getMessage() . "<br>";
        return false;
    } 
}

?>