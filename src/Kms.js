import React, { Component } from 'react';




class Kms extends Component {
  render(){
    return(
      <div>
        <h1>How to encrypt data and manage encryption keys using Key Management Service (KMS).</h1>

          <h2>Check out the data</h2>
          <ol>
          <li>
            We will store the data in Cloud Storage Bucket.

          </li>
          <li>
            Run the following and pick a name for it, such as encrypted_data_imp.
            <code><br />BUCKET_NAME=encrypted_data_imp</code>

          </li>
          <li>
            Copy the data to the bucket or copy from other buckets
            <code><br />gsutil cp gs://bucket_copy_from/filename . </code>

          </li>
          <li>
            Before using KMS you need to enable it in your project. This can be done using the gcloud command-line utility. Run the following command in your shell:

            <code><br />gcloud services enable cloudkms.googleapis.com</code>
            </li>
          </ol>
            <h3>Create a Keyring and Cryptokey</h3>
            <ol>
            <li>
            In order to encrypt the data, you need to create a KeyRing and a CryptoKey.
            KeyRings are useful for grouping keys. Keys can be grouped by environment (like test, staging, and prod)
            or by some other conceptual grouping. Let's define a KeyRing called my_cloud_key_ring and your CryptoKey
            will be called my_cloud_key.

            <code><br />KEYRING_NAME=test CRYPTOKEY_NAME=codelab</code>
            </li>
            <li>  Execute the gcloud command to create the KeyRing. The location as global, but it could
              also be a specific region.

              <code><br />gcloud kms keyrings create $KEYRING_NAME --location global</code>
              </li>
              <li>
            Next, using the new KeyRing, create a CryptoKey named my_cloud_key.

            <code> <br /> gcloud kms keys create $CRYPTOKEY_NAME --location global --keyring $KEYRING_NAME --purpose encryption</code>
              Note: You can't delete CryptoKeys or KeyRings in Cloud KMS!
              You've created a KeyRing and CryptoKey! Open Encryption Keys through the Console. Go to Products & services > IAM & Admin > Encryption Keys
              <br />
              The Key Management Web UI allows you to view and manage your CryptoKeys and KeyRings. You will use this UI later when you manage permissions.
            </li>
        </ol>
        <h2>Encrypt Data</h2>
        <ol>

          <li>Next, try to encrypt some data! Take the contents and base64 encode it
          by running the following:

          <code> <br />  PLAINTEXT=$(cat FILENAME | base64 -w0) </code>
          Note: Base-64 encoding allows binary data to be sent to the API as plaintext. This command works for images, videos, or any other kind of binary data.
        </li>
        <li>
          Using the encrypt endpoint, you can send the base64-encoded text you want to encrypt to the specified key.

          Run the following:

          <code><br />curl -v "https://cloudkms.googleapis.com/v1/projects/$DEVSHELL_PROJECT_ID/locations/global/keyRings/$KEYRING_NAME/cryptoKeys/$CRYPTOKEY_NAME:encrypt" \
            <br />-d "{'{'}\"plaintext\":\"$PLAINTEXT\"{'}'}" \
            <br />-H "Authorization:Bearer $(gcloud auth application-default print-access-token)"\
            <br />-H "Content-Type: application/json <br />"
          </code>
          Note: The encrypt action will return a different result each time even when using same text and key.

        </li>

        <li>
          The response will be a JSON payload containing the encrypted text in the attribute ciphertext.

          Now that your data is encrypted, you can save it to a file and upload it to your Cloud Storage bucket.
          To grab the encrypted text from the JSON response and save it to a file, use the command-line utility jq.
          The response from the previous call can be piped into jq, which can parse out the ciphertext property to the file
          1.encrypted. Please note that <a herf="https://stedolan.github.io/jq/">jq</a> is a lightweight and flexible command-line JSON processor.

          Run the following:

<code><br />curl -v "https://cloudkms.googleapis.com/v1/projects/$DEVSHELL_PROJECT_ID/locations/global/keyRings/$KEYRING_NAME/cryptoKeys/$CRYPTOKEY_NAME:encrypt" \
  <br />-d "{'{'}\"plaintext\":\"$PLAINTEXT\"{'}'}" \
  <br />-H "Authorization:Bearer $(gcloud auth application-default print-access-token)"\
  <br />-H "Content-Type:application/json" | jq .ciphertext -r > FILENAME.encrypted <br /></code>



        </li>

        <li>

        To verify the encrypted data can be decrypted, call the decrypt endpoint to verify the decrypted text matches
        the original email. The encrypted data has information on which CryptoKey version was used to encrypt it,
        so the specific version is never supplied to the decrypt endpoint.

        Run the following:

        <code>
        <br />  curl -v "https://cloudkms.googleapis.com/v1/projects/$DEVSHELL_PROJECT_ID/locations/global/keyRings/$KEYRING_NAME/cryptoKeys/$CRYPTOKEY_NAME:decrypt" \
<br />  -d "{'{'}\"ciphertext\":\"$(cat 1.encrypted)\"{'}'}" \
<br />  -H "Authorization:Bearer $(gcloud auth application-default print-access-token)"\
<br />  -H "Content-Type:application/json" | jq .plaintext -r | base64 -d <br />


        </code>

Note: Usually decryption is performed at the application layer. For a walkthrough on how to encrypt and
decrypt data in multiple programming languages, read the Cloud KMS Quickstart.
</li>
<li>Now that you have verified the text has been encrypted successfully, upload the encrypted file to your Cloud Storage bucket.

<code><br /> gsutil cp 1.encrypted gs://${'{'}BUCKET_NAME{'}'}</code>

        </li>

        </ol>

        <h2>Configure IAM Permissions</h2>
        In KMS, there are two major permissions to focus on. One permissions allows a user or service account to <b>manage
        KMS resources</b>, the other allows a user or service account to use keys to <b>encrypt and decrypt data</b>.

        The permission to manage keys is <code>cloudkms.admin</code>, and allows anyone with the permission to create
        KeyRings and create,
        modify, disable, and destroy CryptoKeys. The permission to encrypt and decrypt is
        <code>cloudkms.cryptoKeyEncrypterDecrypter</code>,
        and is used to call the encrypt and decrypt API endpoints.
        <ol>
        <li>
        Let's use the current authorized user to assign IAM permissions. To get the current authorized
        user, run the command below.

        <code><br /> USER_EMAIL=$(gcloud auth list --limit=1 2>/dev/null | grep '@' | awk '{'{'}print $2{'}'}') </code>
        </li>

        <li>
Next, assign that user the ability to manage KMS resources. Run the following gcloud command to assign the IAM permission to manage the KeyRing you just created:

<code><br /> gcloud kms keyrings add-iam-policy-binding $KEYRING_NAME \
    <br />--location global \
    <br />--member user:$USER_EMAIL \
    <br />--role roles/cloudkms.admin <br /></code>
Since CryptoKeys belong to KeyRings, and KeyRings belong to Projects, a user with a specific role or permission at a higher
level in that hierarchy inherits the same permissions on the child resources. For example, a user who has the role of
Owner on a Project is also an Owner on all the KeyRings and CryptoKeys in that project. Similarly, if a user is granted
the cloudkms.admin role on a KeyRing, they have the associated permissions on the CryptoKeys in that KeyRing.

</li>

<li>Without the cloudkms.cryptoKeyEncrypterDecrypter permission, the authorized user will not be able to use the keys to
  encrypt or decrypt data. Run the following gcloud command to assign the IAM permission to encrypt and decrypt data for
  any CryptoKey under the KeyRing you created:

<code><br />gcloud kms keyrings add-iam-policy-binding $KEYRING_NAME \
    <br />--location global \
    <br />--member user:$USER_EMAIL \
  <br />  --role roles/cloudkms.cryptoKeyEncrypterDecrypter <br /></code>
Now you can view the assigned permissions in Key Management in the Console.
Click the three vertical dots by the KeyRing and select Edit Permissions.
</li>
</ol>
<h2>
  Back up data on the Command Line

</h2>

Now that you have an understanding of how to encrypt a single file, and have permission to do so, you can run a script to
backup all files in a directory. For this example, copy all emails for allen-p, encrypt them, and upload them to a
Cloud Storage bucket.
<ol>
  <li>
First, Copy the Folder to the bucket or copy from other buckets:

<code><br />gsutil -m cp -r gs://bucket_copy_from/FOLDERNAME .
</code>
</li>

<li>Now copy and paste the following into the Cloud Shell terminal to backup and encrypt all the files in the allen-p
directory to your Cloud Storage bucket:


<code><br />MYDIR=allen-p
<br />FILES=$(find $MYDIR -type f -not -name "*.encrypted")
<br />for file in $FILES; do
<br />  PLAINTEXT=$(cat $file | base64 -w0)
<br />  curl -v "https://cloudkms.googleapis.com/v1/projects/$DEVSHELL_PROJECT_ID/locations/global/keyRings/$KEYRING_NAME/cryptoKeys/$CRYPTOKEY_NAME:encrypt" \
<br />    -d "{'{'}\"plaintext\":\"$PLAINTEXT\""'}'"" \
<br />    -H "Authorization:Bearer $(gcloud auth application-default print-access-token)" \
<br />    -H "Content-Type:application/json" \
<br />  | jq .ciphertext -r > $file.encrypted
<br />done
<br />gsutil -m cp allen-p/inbox/*.encrypted gs://${'{'}BUCKET_NAME{'}'}/allen-p/inbox <br />
</code>

This script loops over all the files in a given directory, encrypts them using the KMS API, and uploads them to
Google Cloud Storage.

Note: Cloud Storage supports <a href='https://cloud.google.com/storage/docs/encryption'>Server Side Encryption</a>, which supports key rotation of your data and is the
recommended way to encrypt data in Cloud Storage.

  </li>
</ol>

      </div>
    );
  }
}


export default Kms;
