"use client"

import Image from 'next/image'
import { ChatForm } from '@/components/chat-form'
import { useEffect, useState } from 'react';
import { getAccessToken, redirectToAuthCodeFlow } from '../lib/spotify_login';
import Login from '../components/login'

import { fetchProfile, fetchTopArtists, fetchTopTracks } from '../lib/spotify_api';

import HuangMascotIdle from '../public/huang_mascot_idle.png'
import HuangMascotLaughing from '../public/huang_mascot_laughing.png'
import HuangMascotThinking from '../public/huang_mascot_thinking.png'
import { useChat } from 'ai/react';

enum MascotState {
  Idle = 'idle',
  Thinking = 'thinking',
  Laughing = 'laughing'
}

const mascotForState = (state: MascotState) => {
  switch (state) {
      case MascotState.Idle:
          return HuangMascotIdle;
      case MascotState.Thinking:
          return HuangMascotLaughing;
      case MascotState.Laughing:
          return HuangMascotThinking;
  }
}

export default function Page() {

  const [token, setToken] = useState<string | null>(null);

  const [mascotState, setMascotState] = useState<MascotState>(MascotState.Thinking);
    
  // handle setting token
  useEffect(() => {
    const storedToken = localStorage.getItem('spotifyAuthToken');
    setToken(storedToken);
  }, []);

  // handle auth code
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    console.log("code = ", token)
    if (code) {
      window.history.replaceState({}, '', window.location.pathname);
      fetchTokenWithAuthCode(code);
    }
  }, []);

  const { messages, input, setInput, append } = useChat({
    api: "/api/chat",
  })
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      void append({ content: input, role: "user" })
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  useEffect(() => {
    if (token) fetchTasteData();
}, [token]);

  const fetchTasteData = async () => {
    try {
        
        // fetch data and cache
        const fetchedProfileData = await fetchProfile(token);
        const fetchedTopArtistsData = await fetchTopArtists(token);
        const fetchedTopTracksData = await fetchTopTracks(token);

        
        const topArtists = fetchedTopArtistsData.items.map((artist: any) => artist.name);
        const userName = fetchedProfileData.display_name;
        const topTracks = fetchedTopTracksData.items.map((track: any) => `${track.name} by ${track.artists[0].name}`);
        
        console.log('Profile:', fetchedProfileData);
        console.log('Top artists data:', fetchedTopArtistsData);
        console.log('Top tracks data:', fetchedTopTracksData);
        
        void append({ 
            content: `User's name is ${userName}.
            User's favorite artists: ${topArtists.join(', ')}.
            User's favorite tracks: ${topTracks.join(', ')}.`, 
            role: 'system' 
        });

    } catch (error) {
        console.error('Error fetching taste data:', error);
        logoutUser();
    }
}

    // handle mascot state
    useEffect(() => {
      if (messages.length === 0) {
          return;
      }
      try {
          const lastMessage = messages[messages.length - 1];
          const lastMessageContent = lastMessage.content;
          if (lastMessageContent.includes('<idle>')) {
              setMascotState(MascotState.Idle);
          } else if (lastMessageContent.includes('<thinking>')) {
              setMascotState(MascotState.Thinking);
          } else if (lastMessageContent.includes('<laughing>')) {
              setMascotState(MascotState.Laughing);
          }
      }
      catch (error) {
          console.error('Error setting mascot state:', error);
      }

  }, [messages]);

  const fetchTokenWithAuthCode = async (code: string) => {
    try {
      const token = await getAccessToken(code);
      localStorage.setItem('spotifyAuthToken', token);
      console.log("token = ", token)
      setToken(token);
    } catch (error) {
      console.error('Error getting access token:', error);
    }
  };

  const logoutUser = () => {
    setToken(null);
  };

  
  if (!token || token == "undefined") {
    console.log("token0 = ", token)
    return (
      <Login />
    )
  } else {
    console.log("token1 = ", token)
  }

  return (
    <div>
    {!token ? (
      <Login />
    ) : (
          <div className="flex h-[calc(100vh-64px)]">
      <div className="hidden md:block w-1/3 bg-gray-800 p-4 overflow-y-auto">
        <div className="sticky top-0">
          <Image
            src={mascotForState(mascotState).src}
            alt="AI Assistant"
            width={400}
            height={600}
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatForm 
          messages={messages}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          handleKeyDown={handleKeyDown}
        />
      </div>
    </div>
      )}
    </div>
  )
}

