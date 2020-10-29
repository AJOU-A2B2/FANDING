import { createAction, handleActions } from 'redux-actions';
import firebase from 'firebase/app';
const FUNDING_SAVE= 'FUNDING_SAVE';

export const funding_save=createAction(FUNDING_SAVE);


//수정이 필요함. 현재는 authAction의 복사본일 뿐입니다.
export const firebase_funding_save = newForm => {
  const firestore = firebase.firestore();
  const user=firebase.auth().currentUser.email;

  return (dispatch, getState) => {
    firestore
        .collection("fundings")
        .doc()
        .set({
            user_uid:firebase.auth().currentUser.uid,
            user_email:firebase.auth().currentUser.email,
            artistSelect: newForm.artistSelect,
            fundingType: newForm.fundingType,
            fundingTitle: newForm.fundingTitle,
            fundingStartDate: newForm.fundingStartDate,
            fundingEndDate: newForm.fundingEndDate,
            fundingStartTime: newForm.fundingStartTime,
            fundingEndTime: newForm.fundingEndTime,
            fundingPeriodLimit: newForm.fundingPeriodLimit,
            thumbnailImage: newForm.thumbnailImage,
            detailText: newForm.detailText,
            itemTitle: newForm.itemTitle,
            itemPrice: newForm.itemPrice,
            itemLimitBox: newForm.itemLimitBox,
            itemRemain: newForm.itemRemain,
            itemLimit: newForm.itemLimit,
            shippingMethod: newForm.shippingMethod,
            shippingFee: newForm.shippingFee,
            shippingDetail: newForm.shippingDetail
        })
  };

};

const initialState = {
    auth: null,
    user_data: []
};
export default handleActions({
    [FUNDING_SAVE]: (state,action)=>{
        return {...state }
    }
},initialState);


