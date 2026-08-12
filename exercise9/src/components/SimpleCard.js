function Title({ text }) {
  return <h3>{text}</h3>;
}
function Description({ text }) {
  return <p>{text}</p>;
}
function Image({ url, alt }) {
  return <img src={url} alt={alt} />;
}
function SimpleCard({ item }) {
  return (
    <article className="simple-card">
      <Image url={item.imageUrl} alt={item.title} />
      <div>
        <Title text={item.title} />
        <Description text={item.description} />
      </div>
    </article>
  );
}
export default SimpleCard;
