import { get, put } from "./networker";

export async function fetchProfile(token) {
    return await get(
        "https://api.spotify.com/v1/me", 
        { Authorization: `Bearer ${token}` }
    );
}

// top

export async function fetchTopTracks(token) {
    return await get(
        `https://api.spotify.com/v1/me/top/tracks`, 
        { Authorization: `Bearer ${token}` }
    );
}

export async function fetchTopArtists(token) {
    return await get(
        `https://api.spotify.com/v1/me/top/artists`, 
        { Authorization: `Bearer ${token}` }
    );
}

// playlist

export async function fetchPlaylists(user_id, token) {
    return await get(
        `https://api.spotify.com/v1/users/${user_id}/playlists`, 
        { Authorization: `Bearer ${token}` }
    );
}

export async function fetchPlaylist(playlist_id, token) {
    return await get(
        `https://api.spotify.com/v1/playlists/${playlist_id}`, 
        { Authorization: `Bearer ${token}` }
    );
}

export async function updatePlaylistDescription(playlist_id, playlist_description, token) {
    return await put(
        `https://api.spotify.com/v1/playlists/${playlist_id}`, 
        { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        JSON.stringify({ description: playlist_description})
    );
}