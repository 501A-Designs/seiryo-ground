const EditPlace = () => {
  return (
    <RadixDialog
      title={tLABEL.EDIT}
      size={"large"}
      trigger={
        <Button styleType={"black"} icon={<Pencil1Icon />}>
          {tBUTTON.EDIT_PAGE}
        </Button>
      }
      banner={
        userData.data().level < 5 && (
          <AlignItems justifyContent={"center"}>
            <LockClosedIcon />
            <p>
              全ての編集機能をアクセスするにはカードをアップグレードする必要があります。
            </p>
          </AlignItems>
        )
      }
      saveClose={
        currentPlaceData.name != placeInput ||
        currentPlaceData.description != descriptionInput ||
        currentPlaceData.toilet != binaryToggle ||
        currentPlaceData.type != typeInput ||
        currentPlaceData.cost != costCheckBox ||
        currentPlaceData.size != sizeSelect ||
        currentPlaceData.officialSite != officialSiteInput ? (
          <Button
            styleType={"black"}
            icon={<UpdateIcon />}
            onClick={() => editThisPlace()}
          >
            {tBUTTON.UPDATE_CHANGES}
          </Button>
        ) : (
          false
        )
      }
    >
      {userData && userData.data() && (
        <Grid gap={"small"} grid={"oneTwo"}>
          <Grid gap={"extraSmall"}>
            <RadixAccordion>
              {userData.data().level > 1 && (
                <RadixAccordion.Item number={"1"} name={tLABEL.TOILET}>
                  <ToggleInput
                    state={binaryToggle}
                    onClick={() => setBinaryToggle(!binaryToggle)}
                  />
                </RadixAccordion.Item>
              )}
              {userData.data().level > 3 && (
                <RadixAccordion.Item number={"2"} name={tLABEL.CATEGORY}>
                  <CategoryInput state={typeInput} setState={setTypeInput} />
                </RadixAccordion.Item>
              )}
              {userData.data().level > 2 && (
                <>
                  <RadixAccordion.Item number={"3"} name={tLABEL.PAYMENT}>
                    <PaymentInput
                      state={costCheckBox}
                      setState={setCostCheckBox}
                    />
                  </RadixAccordion.Item>
                  <RadixAccordion.Item number={"4"} name={tLABEL.SIZE}>
                    <RadioInput state={sizeSelect} setState={setSizeSelect} />
                  </RadixAccordion.Item>
                </>
              )}
            </RadixAccordion>
          </Grid>
          <Grid gap={"extraSmall"}>
            {userData.data().level > 4 && (
              <TextInput
                placeholder={tINPUT.PLACE_NAME}
                value={placeInput}
                onChange={(e) => setPlaceInput(e.target.value)}
              />
            )}

            {userData.data().level > 3 && (
              <TextArea
                placeholder={tINPUT.PLACE_DESCRIPTION}
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
              />
            )}

            {userData.data().level > 1 && (
              <TextInput
                placeholder={tINPUT.PLACE_SITE}
                value={officialSiteInput}
                onChange={(e) => setOfficialSiteInput(e.target.value)}
              />
            )}
          </Grid>
        </Grid>
      )}
    </RadixDialog>
  );
};

export default EditPlace;
