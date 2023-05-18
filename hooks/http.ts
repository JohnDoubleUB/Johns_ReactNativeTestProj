import React, { useEffect, useState, useCallback, useReducer } from 'react';

export enum EHttpState 
{
    SEND,
    RESPONSE,
    ERROR,
    CLEAR
}

type ActionData = { type: EHttpState, errorMessage?: string | null | undefined, responseData?: any, effectData?: any; };
type StateData = { loading: boolean, error?: string | null | undefined, data?: any | null | undefined; effect?: any | null | undefined; };


const initialState: StateData = {
    loading: false,
    error: null,
    data: null,
    effect: null
};

function httpReducer(curHttpState: StateData, action: ActionData)
{
    switch (action.type)
    {
        case EHttpState.SEND:
            return { loading: true, error: null };
        case EHttpState.RESPONSE:
            return { ...curHttpState, loading: false, data: action.responseData, effect: action.effectData };
        case EHttpState.ERROR:
            return { loading: false, error: action.errorMessage };
        case EHttpState.CLEAR:
            return initialState;
    }
}

function useHttp<TEffectData>()
{
    const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null, data: null, effect: null });

    function clear()
    {
        dispatchHttp({ type: EHttpState.CLEAR });
    }

    function sendRequest(url: string, method: string, body?: string | undefined | null, effectData?: TEffectData | undefined) 
    {
        dispatchHttp({ type: EHttpState.SEND });
        fetch(
            url,
            {
                method: method,
                body: body,
                headers: { "Content-Type": "application/json" }
            }
        ).then((response) => 
        {
            return response.json();
        }).then((responseData) =>
        {
            dispatchHttp({ type: EHttpState.RESPONSE, responseData: responseData, effectData: effectData });
        }).catch((error) =>
        {
            dispatchHttp({ type: EHttpState.ERROR, errorMessage: `Something went wrong... \n Reason: ${error.message}` });
        });
    };

    let returnData: {
        isLoading: boolean,
        data: any | null,
        error: string | null | undefined,
        effect: TEffectData,
        sendRequest: (url: string, method: string, body?: string | undefined | null, effectData?: TEffectData | undefined) => void,
        clear: () => void;
    } =
    {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        effect: httpState.effect,
        sendRequest: useCallback(sendRequest, []),
        clear: useCallback(clear, [])
    };

    return returnData;
};

export default useHttp;