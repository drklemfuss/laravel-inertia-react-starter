interface Country {
    id: number;
    name: string;
    description: string; // Other fields you may have
}

interface Props {
    country: Country;
}

const CountryShow = ({ country }: Props) => {
    return (
        <div>
            <h1 className="text-2xl font-semibold">{country.name}</h1>
            <p>{country.description}</p>
            {/* Other country details can go here */}
        </div>
    );
};

export default CountryShow;
