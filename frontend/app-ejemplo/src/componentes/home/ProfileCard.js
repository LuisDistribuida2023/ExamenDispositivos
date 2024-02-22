import React from "react";
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SocialIcon = ({ name, url }) => (
  <TouchableOpacity onPress={() => Linking.openURL(url)} style={styles.socialIconContainer}>
    <Icon name={name} size={24} color="#4F8EF7" />
  </TouchableOpacity>
);

import coverPhoto from 'D:/ExamenDispositivosMoviles/Examen/frontend/app-ejemplo/src/componentes/home/logo2.jpeg';
import avatar from 'D:/ExamenDispositivosMoviles/Examen/frontend/app-ejemplo/src/componentes/home/foto.jpg';
import kwaiIcon from 'D:/ExamenDispositivosMoviles/Examen/frontend/app-ejemplo/src/componentes/home/kwai.png';

const ProfileCard = () => {
  const user = {
    avatar: avatar,
    coverPhoto: coverPhoto,
    name: "Luis Briones"
  };

  const socialIcons = [
    { name: 'github', url: 'https://github.com/' },
    { name: 'bandcamp', url: 'https://bandcamp.com/' },
    { name: 'linkedin', url: 'https://linkedin.com/' },
    { name: 'dribbble', url: 'https://dribbble.com/' },
    { name: 'facebook', url: 'https://www.facebook.com/es' },
    { name: kwaiIcon, url: 'https://www.kwai.com/es', isCustomIcon: true },
  ];

  //D:/ExamenDispositivosMoviles/Examen/frontend/app-ejemplo/src/componentes/home/kwai.png

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Image source={{ uri: user.coverPhoto }} style={styles.coverPhoto} />
        <View style={styles.profileContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
        </View>
        <View style={styles.socialContainer}>
          {socialIcons.map((icon, index) => (
            <SocialIcon key={index} name={icon.name} url={icon.url} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  coverPhoto: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -70,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  name: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  socialIconContainer: {
    marginHorizontal: 10,
  },
});

export default ProfileCard;
