<template>
    <v-app>
        <v-form @submit.prevent="onSubmit" id="register-form" enctype="multipart/form-data">

            <div class="wrapper meeting">
                <v-row no-gutters class="mt-5">
                    <v-col cols="12" sm="12" md="12" lg="12"  >
                        <div class="  text-center">
                            <span class=" grey--text font-weight-bold" style="font-size: 25px;">Información personal</span>
                        </div><br>
                        <v-form ref="form"  style="margin-left: 40px; margin-right: 40px;">
                                <span class="font-weight-bold  pt-15 grey--text title">
                                Nombres:
                                </span>
                                
                                <v-text-field
                                    color="#ADE2F8"
                                    outlined
                                    dense
                                    label=""
                                    
                                    
                                    v-model.trim="form.first_name"
                                ></v-text-field>
                                <span class="font-weight-bold  pt-15 grey--text title">
                                Apellidos:
                                </span>
                                <v-text-field
                                    color="#ADE2F8"
                                    dense
                                    label=""
                                    outlined
                                    v-model.trim="form.last_name"
                                ></v-text-field>
                                <span class="font-weight-bold  pt-15 grey--text title">
                                Fecha de nacimiento:
                                </span>
                                <v-dialog
                                    ref="dialog"
                                    v-model="modal"
                                    :return-value.sync="form.birth_date"
                                    persistent
                                    width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model.trim="form.birth_date"
                                        color="#ADE2F8"
                                        prepend-icon="mdi-calendar"
                                        dense
                                        outlined
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    v-model.trim="form.birth_date"
                                    scrollable
                                    >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="modal = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.dialog.save(form.birth_date)"
                                    >
                                        OK
                                    </v-btn>
                                    </v-date-picker>
                                </v-dialog>
                                <span class="font-weight-bold  pt-15 grey--text title">
                                Género:
                                </span>
                                 <v-select
                                    color="#ADE2F8"
                                    :items="gender"
                                    label="Seleccione el género"
                                    
                                    single-line
                                    dense
                                    outlined
                                    item-value="value"
                                    item-text="name"
                                    return-object
                                    v-on:change="isGender"
                                    placeholder=""
                                ></v-select>
                                <span class="font-weight-bold  pt-15 grey--text title">
                                CUI/DPI:
                                </span>
                                <v-text-field
                                    color="#ADE2F8"
                                    dense
                                    label=""
                                    outlined
                                    v-model.trim="form.government_id"
                                ></v-text-field>
                                <span class="font-weight-bold  pt-15 grey--text title">
                                Teléfono:
                                </span>
                                <v-text-field
                                    color="#ADE2F8"
                                    dense
                                    label=""
                                    outlined
                                    v-model.trim="form.phone_number"
                                ></v-text-field>
                                <span class="font-weight-bold  pt-15 grey--text title">
                                Departamento:
                                </span>
                                <v-text-field
                                    color="#ADE2F8"
                                    dense
                                    label=""
                                    outlined
                                    v-model.trim="form.country"
                                ></v-text-field>
                                <span class="font-weight-bold  pt-15 grey--text title">
                                Municipio:
                                </span>
                                <v-text-field
                                    color="#ADE2F8"
                                    dense
                                    label=""
                                    outlined
                                    v-model.trim="form.city"
                                ></v-text-field>
                                <span class="font-weight-bold  pt-15 grey--text title">
                                Dirección:
                                </span>
                                <v-text-field
                                    color="#ADE2F8"
                                    dense
                                    label=""
                                    outlined
                                    v-model.trim="form.address"
                                ></v-text-field>
                                <div align="center" justify="center">  
                                    <v-img :src="url"></v-img>                                      
                                    <v-file-input 
                                        id="photo"
                                        name="photo"
                                        ref="myphoto"
                                        @change="onFileSelected()"
                                        v-model="form.profile_picture"
                                        color="#ADE2F8"
                                        outlined
                                        dense
                                        accept="image/*"
                                        placeholder="Subir foto"
                                        prepend-icon="mdi-face-recognition"
                                        label="Avatar"
                                    >
                                    </v-file-input><br/>
                                </div>
                                 <v-btn @click="on" class="ma-2 white--text button headline pr-10 pl-10" type="submit" form="register-form" rounded color="#ADE2F8" block>
                                    Guardar
                                    
                                </v-btn>
                        </v-form>
                        <!-- <v-btn rounded color="#ADE2F8" block @click="e1 = 4"> -->
                       
                    </v-col>
                </v-row>
            </div>

        </v-form> 
    </v-app>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            menu: false,
            modal: false,
            form: {
                state: 'Guatemala',
                alive: false,
                active: false,
                entity: 1,
                profile_picture: null,
                first_name: '',
                last_name: '',
                birth_date: new Date().toISOString().substring(0, 10),
                gender: '',
                government_id: '',
                phone_number: '',
                country: '',
                city:'',
                address: '',
            },
            url: null,
            gender: [
                { name: ' Femenino', value: false },
                { name: 'Masculino', value: true },
            ],
        }
    },
    methods: {
        isGender(g){
            this.form.gender = g.value
            
        },
        onFileSelected(){
            this.url = URL.createObjectURL(this.form.profile_picture)   
        },
         
        onSubmit(event){
            event.preventDefault();
            let path = 'https://api2.bitmec.com/api/patients/';
            let formData = new FormData();
            var imagefile = document.querySelector('#photo');
            formData.append("profile_picture", imagefile.files[0]);
            formData.append("first_name", this.form.first_name);
            formData.append("last_name", this.form.last_name);
            formData.append("birth_date", this.form.birth_date.concat('T00:00:00Z')  );
            formData.append("gender", this.form.gender);
            formData.append("government_id", this.form.government_id);
            formData.append("phone_number", this.form.phone_number);
            formData.append("country", this.form.country);
            formData.append("city", this.form.city);
            formData.append("address", this.form.address);
            formData.append("state", this.form.state);
            axios.post(path, formData, { headers: { 'Content-Type': 'multipart/form-data'  }})
            .then(() => {
                 this.$swal(
                    {
                        icon: 'success',
                        title: 'Crear paciente',
                        text: '¡Paciente creado con éxito!',
                    }
                );
            })
            .catch((error) => {
                console.error(error);
            })
        },
      
    },
    
}
</script>

<style scoped>
.v-sheet.v-stepper:not(.v-sheet--outlined) {
    box-shadow: none;
}
.v-text-field--outlined > .v-input__control > .v-input__slot {
    background: transparent;
    border: 5px solid #ADE2F8 !important;
    box-sizing: border-box !important;
    box-shadow: 0px 5px 10px #b4dff2 !important;
    border-radius: 15px !important;
}
.v-responsive {
    max-width: 30% !important;
}
.button{
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    background-color: #ADE2F8;
    box-shadow: 0px 5px 10px #ADE2F8;
}
</style>