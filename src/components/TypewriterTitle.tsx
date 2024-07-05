
import Typewriter from 'typewriter-effect'

export default function TypewriterTitle() {
    return (
        <Typewriter
        options={{
            loop: true,
            delay:20,
            autoStart:true,
            strings:['Only compatible with brave browser','you forgot to create an HTML of your bookmarks?','Dont worry about it!' ]
            
        }}
        
        >
    
        </Typewriter>
      )
}