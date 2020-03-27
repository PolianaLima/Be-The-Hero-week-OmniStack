import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as mailComposer from 'expo-mail-composer';



import styles from './styles';
import logoImg from '../../assets/logo.png';


export default function Detail () {
    const navedetail = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Ola ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso ${incident.title}, com o valor de ${Intl.NumberFormat( 'pt-BR', { style: 'currency', currency: 'BRL' } ).format( incident.value )}`;

    function navigateBack () {
        navedetail.goBack()
    }

    function sendEmail () {
        mailComposer.composeAsync( {
            subject: `'Heroi do caso:${incident.title}`,
            recipients: [incident.email],
            body: message,

        } )
    }

    function sendWhatshapp () {
        Linking.openURL( `whatsapp://send?phone=${incident.whatsapp}=${message}` );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navedetail.goBack} >
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty], { marginTop: 0 }}>ONG</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASE</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>Valor</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat( 'pt-BR', { style: 'currency', currency: 'BRL' } ).format( incident.value )}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso!</Text>

                <Text style={styles.heroDescription}>Entre em contato </Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatshapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}