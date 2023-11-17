interface ThreadResponseAudioWidget {
    audio: string
}

export function ThreadResponseAudioWidget({ audio }: ThreadResponseAudioWidget) {
    return (
        <audio>
            <source src={audio} type="audio/mp3" />
        </audio>
    )
}