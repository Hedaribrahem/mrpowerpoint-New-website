import Typewriter from 'typewriter-effect';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TypewriterText({ text, className = '', delay = 80 }: TypewriterTextProps) {
  return (
    <span className={className}>
      <Typewriter
        options={{
          strings: [text],
          autoStart: true,
          loop: true,
          delay,
          deleteSpeed: 40,
        }}
      />
    </span>
  );
}
