import { router } from 'expo-router';
import { Button, Text, TextInput, View } from 'react-native';

import { useAuth } from '@/providers';
import React, { useState } from 'react';
import { CustomLink } from '@/components/CustomLink';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { signIn } = useAuth();

	const handleSignIn = async () => {
		try {
			await signIn(email, password);

			router.replace('/');
		} catch (error) {
			console.error('Failed to sign in:', error);
		}
	};

	return (
		<View className="flex-1 justify-center items-center px-4">
			<Text className="font-firaSemibold text-2xl mb-4">Welcome to Awesome App!</Text>
			<TextInput
				className="w-full p-2 my-2 border border-gray-300 rounded-md"
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<TextInput
				className="w-full p-2 my-2 border border-gray-300 rounded-md"
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<Button title="Sign In" onPress={handleSignIn} />
			<Text>
				Don't have an account? <CustomLink href={'/sign-up'} text={'Sign Up'} />
			</Text>
		</View>
	);
}
