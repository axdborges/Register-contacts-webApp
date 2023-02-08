


export const ContactCard = ({name, email, telefone}) => {


    return (
        <div className="container h-40 max-w-sm mx-auto box-border flex flex-col items-center justify-around rounded-lg shadow-lg">
            <h4>
                <span className="font-semibold">Nome:{" "}</span> 
                {name}
            </h4>
            <p>
                <span className="font-semibold">E-mail:{" "}</span>
                {email}
            </p>
            <p>
                <span className="font-semibold">Telefone:{" "}</span> 
                {telefone}
            </p>
        </div>
    )
}