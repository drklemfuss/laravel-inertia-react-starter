import { Link } from "@inertiajs/react";

interface Country {
    id: number;
    name: string;
}

interface Props {
    countries: Country[];
}

const CountryIndex = ({ countries }: Props) => {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Countries</h1>
            <ul>
                {countries.map((country) => (
                    <li key={country.id}>
                        <Link href={route("countries.show", country.id)}>
                            {country.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountryIndex;
