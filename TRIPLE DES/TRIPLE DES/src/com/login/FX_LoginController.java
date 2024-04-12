/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.login;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.control.Tooltip;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

/**
 * FXML Controller class
 *
 * @author KENSOFT
 */
public class FX_LoginController implements Initializable {

    @FXML
    private TextField text_username;
    @FXML
    private PasswordField text_password;
    @FXML
    private Button button_login;
    @FXML
    private BorderPane loginLayout;

    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        tooltip();
    }
    
    private void tooltip(){
        Tooltip userTip = new Tooltip("Please enter your username");
        userTip.setStyle("-fx-background-color: linear-gradient(to right top, #810e0e, #870027, #820046, #67006a, #00068e); -fx-text-fill: white");
        Image icon = new Image(getClass().getResourceAsStream("icon.png"));
        userTip.setGraphic(new ImageView(icon));
        text_username.setTooltip(userTip);
        
        Tooltip passTip = new Tooltip("Please enter your password");
        passTip.setStyle("-fx-background-color: linear-gradient(to right top, #810e0e, #870027, #820046, #67006a, #00068e); -fx-text-fill: white");
        Image passicon = new Image(getClass().getResourceAsStream("icon.png"));
        passTip.setGraphic(new ImageView(passicon));
        text_password.setTooltip(passTip);
    }

    @FXML
    private void Login(MouseEvent event) throws IOException {
        if(text_username.getText().equals("admin") && text_password.getText().equals("adminpassword")){
            BorderPane borderpane = FXMLLoader.load(getClass().getResource("FX_Encryption.fxml"));
            Stage stage = new Stage();
            Scene scene = new Scene(borderpane);
            stage.setScene(scene);
            stage.setTitle("Kensoft PH | Data Encryption");;
            stage.setMinHeight(400);
            stage.setMinWidth(400);
            stage.show();
            loginLayout.getScene().getWindow().hide();
        }else{
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Login");
            alert.setContentText("Username or password is invalid");
            alert.setHeaderText("Login Failed");
            alert.show();
        }
    }
}
