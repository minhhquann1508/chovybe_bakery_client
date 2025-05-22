import { Button } from "antd";
import { useState } from "react";
import { CustomModal } from "../../components";

const Banner = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <CustomModal
        title="Testing"
        visible={isOpenModal}
        setIsVisible={setIsOpenModal}
      >
        <div>hello</div>
      </CustomModal>
      <Button onClick={openModal}>Mở modal</Button>
    </>
  );
};

export default Banner;
