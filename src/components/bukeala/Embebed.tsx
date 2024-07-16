interface embebedProps{
    url: string;
}

const Embebed = ({
    url,
}:embebedProps) => {
  return (
    <iframe 
      className="k-embed-bukeala" 
      src={url} 
      title="Embebido Bukeala" 
    />  
  )
}

export default Embebed