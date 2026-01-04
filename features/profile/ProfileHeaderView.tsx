import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ProfileHeaderView = () => {
  return (
    <View style={styles.header}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }} // Placeholder image
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editAvatarButton}>
          <FontAwesome name="camera" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>Asad Anik</Text>
      <Text style={styles.email}>asad.anik@example.com</Text>
      <TouchableOpacity style={styles.editProfileButton} onPress={() => console.log('Edit Profile')}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2196F3',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  editProfileButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  editProfileText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ProfileHeaderView;
