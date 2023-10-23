import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Image, Link } from "@nextui-org/react";
import React from "react";

const SuccessCard = ({
  title,
  subText,
  callBackUrl,
}: {
  subText: any;
  title: string;
  callBackUrl: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-16">
      <div className="mt-10 text-black text-3xl font-semibold ">
        <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#000000" }} />
        {title}
      </div>

      <>
        <Image
          as={Image}
          width={0}
          height={0}
          style={{ width: "350px", height: "250px" }}
          radius="sm"
          alt="cat"
          src="https://cataas.com/cat?width=350&height=250"
        />
        <span className="text-xl px-12">
          {subText} Możesz{" "}
          <Link
            href="login"
            className="font-bold text-lg text-violet-500"
            underline="none"
            as={Link}
            color="primary"
          >
            zalogować się
          </Link>{" "}
          i w pełni móc korzystać z serwisu{" "}
          <span className="font-platanka text-xl font-bold text-primary-400">
            PlątAnka
          </span>
          .
        </span>
      </>

      <Link href={callBackUrl} as={Link} color="primary">
        Wróć
      </Link>
    </div>
  );
};

export default SuccessCard;
