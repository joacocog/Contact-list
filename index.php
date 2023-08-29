<?php include 'includes/functions/functions.php'; ?>
<?php include 'includes/layout/header.php'; ?>


<div class="bar-container">
    <h1>Contact List</h1>
</div>

<div class="bg-yellow container shadow">
    <form id="contact" action="#">
        <legend>Add New Contact <span>All fields are required</span></legend>

        <?php include 'includes/layout/form.php'; ?>
    </form>
</div>

<div class="bg-white container shadow contacts">
    <div class="contacts-container">
        <h2>Search Contacts</h2>

        <input type="text" id="search" class="search shadow">

        <p class="total-contacts"><span></span>Contacts</p>

        <div class="table-container">
            <table id="contact-list">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $contacts = getContacts();
                        
                        if($contacts->num_rows){ 
                            
                            foreach($contacts as $contact){?>

                    <tr>
                        <td><?php echo $contact['name']; ?></td>
                        <td><?php echo $contact['company']; ?></td>
                        <td><?php echo $contact['phone']; ?></td>
                        <td>
                            <a href="edit.php?id=<?php echo $contact['id']; ?>" class="btn-edit btn">
                                <i class="fas fa-pen-square"></i>
                            </a>
                            <button data-id="<?php echo $contact['id']; ?>" type="button" class="btn-delete btn">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>

                    <?php } 
                    }?>

                </tbody>
            </table>
        </div>
    </div>
</div>

<?php include 'includes/layout/footer.php'; ?>