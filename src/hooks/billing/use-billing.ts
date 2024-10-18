import { useEffect, useState } from 'react';
import {
  onConectStripeUser,
  onCreateCustomerPaymentIntentSecret,
  onGetStripeClientSecret,
  onUpdateSubscription,
} from '@/actions/stripe';
import {
  useElements,
  useStripe as useStripeHook,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { toast, useToast } from '../use-toast';

export const useStripe = () => {
  const [onStripeAccountPending, setOnStripeAccountPending] = useState<boolean>(false);
  const router = useRouter();

  const onStripeConnect = async (stripeAccountId: string) => {
    try {
      setOnStripeAccountPending(true);

      const response = await onConectStripeUser(stripeAccountId);

      setOnStripeAccountPending(false);


      if (response.status === 200) {
        toast({
          title: 'Sucesso!',
          description: 'Conectado com sucesso',
        });
        router.push('/callback/stripe/success')

      } else {

        toast({
          title: 'Erro!',
          description: 'Erro ao conectar',
        });
      }
    } catch (error) {
      setOnStripeAccountPending(false);
      console.error('Erro ao conectar com o Stripe:', error);

      toast({
        title: 'Erro!',
        description: 'Erro ao conectar com o Stripe',
      });
    }
  };

  return { onStripeConnect, onStripeAccountPending };
};


export const useStripeCustomer = (amount: number, stripeId: string) => {
  const [stripeSecret, setStripeSecret] = useState<string>('');
  const [loadForm, setLoadForm] = useState<boolean>(false);

  const onGetCustomerIntent = async (amount: number) => {
    try {
      setLoadForm(true);
      const intent = await onCreateCustomerPaymentIntentSecret(
        amount,
        stripeId
      );
      if (intent) {
        setLoadForm(false);
        setStripeSecret(intent.secret!);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetCustomerIntent(amount);
  }, []);

  return { stripeSecret, loadForm };
};

export const useCompleteCustomerPayment = (onNext: () => void) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const { toast } = useToast();
  const stripe = useStripeHook();
  const elements = useElements();

  const onMakePayment = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return null;
    }

    console.log('no reload');

    try {
      setProcessing(true);

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/settings',
        },
        redirect: 'if_required',
      });

      if (error) {
        console.log(error);
      }

      if (paymentIntent?.status === 'succeeded') {
        toast({
          title: 'Sucesso!',
          description: 'Pagamento concluído',
        });
        onNext();
      }

      setProcessing(false);
    } catch (error) {
      console.log("caiu aqui................")
      console.log(error);
    }
  };

  return { processing, onMakePayment };
};

export const useSubscriptions = (plan: 'Simples' | 'Ultimate' | 'Plus') => {
  const [loading, setLoading] = useState<boolean>(false);
  const [payment, setPayment] = useState<'Simples' | 'Ultimate' | 'Plus'>(plan);
  const { toast } = useToast();
  const router = useRouter();
  const onUpdatetToFreTier = async () => {
    try {
      setLoading(true);
      const free = await onUpdateSubscription(payment);
      if (free) {
        setLoading(false);
        toast({
          title: 'Sucesso!',
          description: free.message,
        });
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSetPayment = (payment: 'Simples' | 'Ultimate' | 'Plus') =>
    setPayment(payment);

  return {
    loading,
    onSetPayment,
    payment,
    onUpdatetToFreTier,
  };
};

export const useStripeElements = (payment: 'Simples' | 'Ultimate' | 'Plus') => {
  const [stripeSecret, setStripeSecret] = useState<string>('');
  const [loadForm, setLoadForm] = useState<boolean>(false);

  const onGetBillingIntent = async (plans: 'Simples' | 'Ultimate' | 'Plus') => {
    try {
      setLoadForm(true);
      const intent = await onGetStripeClientSecret(plans);
      if (intent) {
        setLoadForm(false);
        setStripeSecret(intent.secret!);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetBillingIntent(payment);
  }, [payment]);

  return { stripeSecret, loadForm };
};

export const useCompletePayment = (
  payment: 'Simples' | 'Ultimate' | 'Plus'
) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const stripe = useStripeHook();
  const elements = useElements();

  const onMakePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return null;
    }

    try {
      setProcessing(true);

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/settings',
        },
        redirect: 'if_required',
      });

      if (error) {
        console.log(error);
      }

      if (paymentIntent?.status === 'succeeded') {
        const plan = await onUpdateSubscription(payment);
        if (plan) {
          toast({
            title: 'Sucesso!',
            description: plan.message,
          });
        }
      }

      setProcessing(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return { processing, onMakePayment };
};
