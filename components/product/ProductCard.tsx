import Image from "next/image";
import { Button } from "../ui/Button";

export function ProductCard() {
  return (
    <div>
      <Image
        src="/logo/logo_horizontal_velune.png"
        alt="Velune Pratas"
        width={400}
        height={400}
        />
      
      <div>
        <h3>Anel Riviera</h3>

        <p>R$ 149,90</p>

        <p>
          Anel em Prata 925 com acabamento polido e design minimalista.
        </p>

        <Button variant="secondary">Ver mais</Button>
      </div>
    </div>
  );
}