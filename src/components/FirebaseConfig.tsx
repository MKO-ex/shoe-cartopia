
import React, { useState } from 'react';
import { firebaseConfig } from '@/lib/firebase';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const FirebaseConfig = () => {
  const firebaseConfig = {
  apiKey: "AIzaSyC51boYofHOPsTetwz9AhbULKfYFXQyNSI",
  authDomain: "kam-shoes-9bff4.firebaseapp.com",
  projectId: "kam-shoes-9bff4",
  storageBucket: "kam-shoes-9bff4.firebasestorage.app",
  messagingSenderId: "1040539363232",
  appId: "1:1040539363232:web:9c0d013cdbe904a66c66c5",
  measurementId: "G-Q5JP5RB7CF"
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const saveConfig = () => {
    // In a real application, you would save these to environment variables
    // or a secure storage. This is just a demonstration.
    localStorage.setItem('firebaseConfig', JSON.stringify(config));
    
    toast({
      title: "Configuration Saved",
      description: "Firebase configuration has been saved.",
      duration: 3000,
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Firebase Configuration</CardTitle>
        <CardDescription>
          Enter your Firebase project credentials below. Note that storing API keys in the frontend
          is only suitable for client-side Firebase services with proper security rules.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input 
            id="apiKey"
            name="apiKey"
            value={config.apiKey} 
            onChange={handleChange}
            placeholder="Enter your Firebase API key"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="authDomain">Auth Domain</Label>
          <Input 
            id="authDomain"
            name="authDomain"
            value={config.authDomain} 
            onChange={handleChange}
            placeholder="yourapp.firebaseapp.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="projectId">Project ID</Label>
          <Input 
            id="projectId"
            name="projectId"
            value={config.projectId} 
            onChange={handleChange}
            placeholder="your-project-id"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="storageBucket">Storage Bucket</Label>
          <Input 
            id="storageBucket"
            name="storageBucket"
            value={config.storageBucket} 
            onChange={handleChange}
            placeholder="yourapp.appspot.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="messagingSenderId">Messaging Sender ID</Label>
          <Input 
            id="messagingSenderId"
            name="messagingSenderId"
            value={config.messagingSenderId} 
            onChange={handleChange}
            placeholder="123456789012"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="appId">App ID</Label>
          <Input 
            id="appId"
            name="appId"
            value={config.appId} 
            onChange={handleChange}
            placeholder="1:123456789012:web:abc123def456"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="measurementId">Measurement ID (optional)</Label>
          <Input 
            id="measurementId"
            name="measurementId"
            value={config.measurementId} 
            onChange={handleChange}
            placeholder="G-ABCDEF1234"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={saveConfig}>Save Configuration</Button>
      </CardFooter>
    </Card>
  );
};

export default FirebaseConfig;
