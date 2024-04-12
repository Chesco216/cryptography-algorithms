package com.tdes;

import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;
import java.util.ResourceBundle;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.input.MouseEvent;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

public class FX_EncryptionController implements Initializable {

    @FXML
    private TextField txt_data;
    @FXML
    private TextField txt_key;
    @FXML
    private TextArea txtArea_result;
    @FXML
    private Button btn_encrypt;
    @FXML
    private Button btn_decrypt;

    private static final String SALT = "ThisIsSalt";
    private static Cipher cipher;

    @Override
    public void initialize(URL url, ResourceBundle rb) {
        
    }
    public String TDESencrypt() throws Exception {
        byte[] encryptKey = txt_key.getText().getBytes();
        DESedeKeySpec spec = new DESedeKeySpec(encryptKey);
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DESede");
        SecretKey theKey = keyFactory.generateSecret(spec);
        Cipher cipher = Cipher.getInstance("DESede/ECB/NoPadding");
        cipher.init(Cipher.ENCRYPT_MODE, theKey);
        byte[] encrypted = cipher.doFinal(padString(txt_data.getText()).getBytes());
        String txt = Base64.getEncoder().encodeToString(encrypted);
        txtArea_result.setText(txt);
        return null;
    }

    public String TDESdecrypt() throws Exception {
        byte[] encryptKey = txt_key.getText().getBytes();
        DESedeKeySpec spec = new DESedeKeySpec(encryptKey);
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DESede");
        SecretKey theKey = keyFactory.generateSecret(spec);
        Cipher cipher = Cipher.getInstance("DESede/ECB/NoPadding");
        cipher.init(Cipher.DECRYPT_MODE, theKey);
        byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(txt_data.getText()));
        String dec = new String(decrypted).trim(); // Trim to remove trailing null characters
        txtArea_result.setText(dec);
        return null;
    }

private String padString(String input) {
    int blockSize = 8; // El tamaño del bloque de cifrado en DESede es de 64 bits = 8 bytes
    int paddingLength = blockSize - (input.length() % blockSize);
    StringBuilder paddedInput = new StringBuilder(input);
    for (int i = 0; i < paddingLength; i++) {
        paddedInput.append((char) 0); // Agregar caracteres nulos para completar el bloque
    }
    return paddedInput.toString();
}
@FXML
    private void buttonEncrypt(MouseEvent event) throws Exception {
        if (txt_key.getText().trim().isEmpty() && txt_data.getText().trim().isEmpty()) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setContentText("Key and Data cannot be empty");
            alert.setHeaderText(null);
            alert.setTitle("Encrypt");
            alert.showAndWait();
        } else if (txt_key.getText().trim().isEmpty()) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setContentText("Key cannot be empty");
            alert.setHeaderText(null);
            alert.setTitle("Encrypt");
            alert.showAndWait();
        } else if (txt_data.getText().trim().isEmpty()) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setContentText("Data cannot be empty");
            alert.setHeaderText(null);
            alert.setTitle("Encrypt");
            alert.showAndWait();
        } else {
            if (txt_key.getText().length() <= 23) {
                Alert alert = new Alert(Alert.AlertType.ERROR);
                alert.setContentText("Please add your key");
                alert.setHeaderText("Wrong key size");
                alert.setTitle("Encrypt");
                alert.showAndWait();
            } else {
                TDESencrypt();
            }
        }
    }

    @FXML
    private void buttonDecrypt(MouseEvent event) throws Exception {
        if (txt_key.getText().trim().isEmpty() && txt_data.getText().trim().isEmpty()) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setContentText("Key and Data cannot be empty");
            alert.setHeaderText(null);
            alert.setTitle("Decrypt");
            alert.showAndWait();
        } else if (txt_key.getText().trim().isEmpty()) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setContentText("Key cannot be empty");
            alert.setHeaderText(null);
            alert.setTitle("Decrypt");
            alert.showAndWait();
        } else if (txt_data.getText().trim().isEmpty()) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setContentText("Data cannot be empty");
            alert.setHeaderText(null);
            alert.setTitle("Decrypt");
            alert.showAndWait();
        } else {
            TDESdecrypt();
        }
    }
}