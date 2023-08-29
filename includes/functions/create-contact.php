<?php

if($_POST['action'] == 'create'){
    // Create a new contact in DB

    require_once('db.php');

    // Validate entries

    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $company = filter_var($_POST['company'], FILTER_SANITIZE_STRING);
    $phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);

    try{
        $stmt = $conn->prepare("INSERT INTO contacts (name, company, phone) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $company, $phone);
        $stmt->execute();
        if($stmt->affected_rows == 1) {
            $answer = array(
                 'answer' => 'successfully',
                 'data' => array(
                      'name' => $name,
                      'company' => $company,
                      'phone' => $phone,
                      'id_inserted' => $stmt->insert_id
                 )
            );
       }
        $stmt->close();
        $conn->close();
    }catch(Exception $e){
        $answer = array(
            'error' => $e->getMessage()
        );
    }

    echo json_encode($answer);
}

?>