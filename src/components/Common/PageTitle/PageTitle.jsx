import "./Style.css";
export default function PageTitle({mainTitle, subTitle}) {
  return (
    <>
      <h3 className="page-title">{mainTitle}</h3>
      <p className="page-subtitle">{subTitle}</p>
      <hr />
    </>
  );
}
